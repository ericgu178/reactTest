import App from '../src/serverapp';
import Koa from 'koa';
import React from 'react';
import Router from 'koa-router';
import fs from 'fs';
import koaStatic from 'koa-static';
import path from 'path';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server';
import RouterConfig from "../src/router/index"
import { getContent } from "../src/api/index";

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

// 设置路由
app.use(
    new Router()
        .get('*', async (ctx, next) => {
                let data = await getContent()
                const result = [];
                data.data.filter(item => {
                    const tags = [];
                    item.label_pk_ids.filter(tag => {
                        tags.push(tag.label_name)
                    })
                    result.push({
                        href: `/p/${item.id}`,
                        title: item.blog_title,
                        description: item.blog_describe.length > 120 ? item.blog_describe : item.blog_content.substr(0, 200),
                        create_time: item.create_time,
                        reads: item.reads,
                        img: `https://ericgu178.com/${item.material_id.filepath}`,
                        tags: tags.join(',')
                    })
                })
        
            const context = { listData: result, pageTotal: data.total,pageSize: 10,loading: false,
                    contentLoading: false,url:'https://ericgu178.com/'};

            
            const html = renderToString(
                <Provider>
                    <StaticRouter location={ctx.url} context={context}>
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
                    // console.log(data)
                    shtml = data;
                    resolve();
                });
            });
            ctx.response.body = shtml.replace('{{title}}', 'EricGU178 个人博客');
            ctx.response.body = ctx.response.body.replace('{{script}}', `<script>window.__INITIAL_STATE__ = ${JSON.stringify(context)}</script>`);
            ctx.response.body = ctx.response.body.replace('{{root}}', html);
            await next();
    })
    .routes()
);



app.listen(config.port, function() {
  console.log('服务器启动，监听 端口号： ' + config.port + '  running');
});