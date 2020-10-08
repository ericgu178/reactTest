import React from 'react'
import { Switch, withRouter, Redirect } from 'react-router-dom'
import RenderRoutes from './router';


import indexs from '../views/index';
import p from '../views/p';
import about from '../views/about';
import archive from '../views/archive';
import search from '../views/search';
import tagArticle from '../views/search/tagArticle';
import picture from '../views/picture';

class index extends React.Component {
    // setTitle = title => () => document.title = title;

    render() {
        console.log(this.props)
        return (
            // 我们将这个key绑定在 路由顶层元素上就能精确定位路由了 解决的是路由变了 但是页面没有刷新
            <div key={this.props.location.key}>
                <Switch>
                    <RenderRoutes path="/index" component={indexs} title="EricGU178的博客"/>
                    <RenderRoutes path="/about" component={about} title="关于我"/>
                    <RenderRoutes path="/p/:id" component={p} />
                    <RenderRoutes path="/archive" component={archive} />
                    <RenderRoutes path="/search/:q" component={search}/>
                    <RenderRoutes path="/t/:id/:title" component={tagArticle}/>
                    <RenderRoutes path="/img" component={picture}/>
                    <Redirect from="/" to="/index" />
                </Switch>
            </div>
        )
    }
}

export default withRouter(index)