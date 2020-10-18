import Koa from 'koa';
import React from 'react';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import fs from 'fs';
import koaStatic from 'koa-static';
import path from 'path';
import { Provider } from 'react-redux';
import { StaticRouter,Switch,Route } from 'react-router-dom'
import { matchRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { routes } from "../src/router/index"
import getCreateStore from './store';
import {TReducer,PReducer,IndexReducer,AReducer,ImgReducer,BiyingReducer}  from '../src/store/reducers';
import index from "../src/views/main"

const Logger = require('koa-logger');

// 配置文件
const config = {
    port: 3040,
    title:'EricGU178的个人博客'
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
app.use(Logger());

// 设置路由
app.use(
    new Router()
        .get('/about' , async (ctx, next) => {
            const { store } = getCreateStore(ctx,AReducer)
            await renderFullHtml(ctx,store,ctx.req.url,'关于我')
            await next()
        })
        .get('/img' , async (ctx, next) => {
            const {store} = await searchTemplate(ctx,ImgReducer,ctx.req.url,ctx.params)
            await renderFullHtml(ctx,store,ctx.req.url,'相册图片')
            await next()
        })
        .get('/p/:id' , async (ctx, next) => {

            const {store} = await searchTemplate(ctx,PReducer,'/p',ctx.params)
            const state = store.getState();

            await renderFullHtml(ctx,store,`/p/${ctx.params.id}`,state.P.data.blog_title)
            await next()
        })
        .get('/t/:id/:title' , async (ctx, next) => {

            const {store} = await searchTemplate(ctx,TReducer,'/t',ctx.params)

            await renderFullHtml(ctx,store,`/t/${ctx.params.id}/${ctx.params.title}`,`标签-${ctx.params.title}`)
            await next()
        })
        .get('/biying' , async (ctx, next) => {
            let url = ctx.req.url.substr(0,ctx.req.url.indexOf('?'))
            url = url.length === 0 ? ctx.req.url : url;
            const {store} = await searchTemplate(ctx,BiyingReducer,url,ctx.request.query)
            
            await renderFullHtml(ctx,store,url,'必应每日高清壁纸')
            await next()
        })
        .get('/search/:q' , async (ctx, next) => {
            const {store} = await searchTemplate(ctx,TReducer,'/search',ctx.params)
            
            await renderFullHtml(ctx,store,`/search/${ctx.params.q}`,`检索关键字-${ctx.params.q}`)
            await next()
        })
        .get('/archive', async (ctx, next)=> {
            let url = ctx.req.url.substr(0,ctx.req.url.indexOf('?'))
            url = url.length === 0 ? ctx.req.url : url;

            const {store} = await searchTemplate(ctx,AReducer,url,ctx.request.query)

            await renderFullHtml(ctx,store,url,(ctx.request.query.date || new Date().getFullYear()) + '年的归档')
            await next();
        })
        .get('/', async (ctx, next) => {
            const {store} = await searchTemplate(ctx,IndexReducer,'/index',ctx.request.query)

            await renderFullHtml(ctx,store,'/index')
            await next();
        })
        .get('/index', async (ctx, next) => {
            let url = ctx.req.url.substr(0,ctx.req.url.indexOf('?'))
            url = url.length === 0 ? ctx.req.url : url;

            const {store} = await searchTemplate(ctx,IndexReducer,url,ctx.request.query)

            await renderFullHtml(ctx,store,url)
            await next();
    })
    .routes()
);

app.listen(config.port, function() {
  console.log('服务器启动，监听 端口号： ' + config.port + '  running');
});

/**
 * 找寻路由匹配
 * 
 * @param {*} ctx 上下文
 * @param {*} reducer redux
 * @param {*} url 地址
 * @param {*} query 查询参数
 */
async function searchTemplate(ctx,reducer,url,query) {
    const branch = matchRoutes(routes, url);
    const { store } = getCreateStore(ctx,reducer)
    const promises = branch.map(({route}) => {
        const fetch = route.component.fetch;
        return fetch instanceof Function ? fetch(store,query) : Promise.resolve(null)
    });
    await Promise.all(promises).catch((err)=>{
        console.log(err);
    });
    return {store}
}

/**
 * 生成模板源代码
 * 
 * @param {*} ctx 上下文
 * @param {*} store 状态管理
 * @param {*} url 地址
 */
async function renderFullHtml(ctx,store,url,title = undefined) {
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={url} context={{}}>
                <Switch>
                    <Route path="/" component={index} />
                </Switch>
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

    ctx.response.body = shtml.replace('{{title}}', (title !== undefined ? title + ' | ' : '') + config.title);
    ctx.response.body = ctx.response.body.replace('{{script}}', `<script>window.__INITIAL_STATE__ = ${JSON.stringify(initState)}</script>`);
    ctx.response.body = ctx.response.body.replace('{{root}}', html);
}