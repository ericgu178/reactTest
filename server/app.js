import Koa from 'koa';
import React from 'react';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import fs from 'fs';
import koaStatic from 'koa-static';
import path from 'path';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import RouterConfig,{ routes } from "../src/router/index"
import getCreateStore from './store';
// 配置文件
const config = {
    port: 3030
};
// 实例化 koa
const app = new Koa();
// 静态资源
app.use(
    koaStatic(path.join(__dirname, '../build'), {
        maxage: 365 * 24 * 60 * 1000,
        index: 'root'
        // 这里配置不要写成'index'就可以了，因为在访问localhost:3030时，不能让服务默认去加载index.html文件，这里很容易掉进坑。
    })
);
app.use(bodyParser());
app.use(cors());
// 设置路由
app.use(
    new Router()
        .get('/p/:id' , async (ctx, next) => {
            console.log(ctx.params)
            const branch = matchRoutes(routes, '/p');
            // console.log(branch)
            const { store ,history} = getCreateStore(ctx)
            const promises = branch.map(({route}) => {
                const fetch = route.component.fetch;
                return fetch instanceof Function ? fetch(store,ctx.params) : Promise.resolve(null)
            });
            await Promise.all(promises).catch((err)=>{
                console.log(err);
            });
            await renderFullHtml(ctx,store,`/p/${ctx.params.id}`)
            await next()
        })
        .get('/index', async (ctx, next) => {
            let url = ctx.req.url.substr(0,ctx.req.url.indexOf('?'))
            url = url.length === 0 ? ctx.req.url : url;

            const branch = matchRoutes(routes, url);
            let query = ctx.request.query
            const { store ,history} = getCreateStore(ctx)
            const promises = branch.map(({route}) => {
                const fetch = route.component.fetch;
                return fetch instanceof Function ? fetch(store,query) : Promise.resolve(null)
            });
            await Promise.all(promises).catch((err)=>{
                console.log(err);
            });

            await renderFullHtml(ctx,store,url)
            await next();
    })
    .routes()
);

app.listen(config.port, function() {
  console.log('服务器启动，监听 端口号： ' + config.port + '  running');
});

// 渲染模板
async function renderFullHtml(ctx,store,url) {
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={url} context={{}}>
                <RouterConfig/>
            </StaticRouter> 
        </Provider>
    );
    ctx.response.type = 'html'; //指定content type
    let shtml = '';
    await new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../build/index.html'), 'utf8', function(err, data) {
            if (err) {
                reject();
                return console.log(err);
            }
            shtml = data;
            resolve();
        });
    });
    let initState = store.getState();
    ctx.response.body = shtml.replace('{{title}}', 'EricGU178 个人博客');
    ctx.response.body = ctx.response.body.replace('{{script}}', `<script>window.__INITIAL_STATE__ = ${JSON.stringify(initState)}</script>`);
    ctx.response.body = ctx.response.body.replace('{{root}}', html);
}