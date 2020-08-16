import React from 'react'
import { Switch, withRouter, Redirect } from 'react-router-dom'
import RenderRoutes from './router';


import indexs from '../views/index';
import p from '../views/p';
import about from '../views/about';
import archive from '../views/archive';
import search from '../views/search';

class index extends React.Component {
    render() {
        return (
            // 我们将这个key绑定在 路由顶层元素上就能精确定位路由了 解决的是路由变了 但是页面没有刷新
            <div key={this.props.location.key}>
                <Switch>
                    <RenderRoutes path="/index" component={indexs} />
                    <RenderRoutes path="/about" component={about} />
                    <RenderRoutes path="/p/:id" component={p} />
                    <RenderRoutes path="/archive" component={archive} />
                    <RenderRoutes path="/search/:q" component={search}/>
                    <Redirect from="/" to="/index" />
                </Switch>
            </div>
        )
    }
}

export default withRouter(index)