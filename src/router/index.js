import React from 'react'
import { Switch, withRouter, Route, Redirect } from 'react-router-dom'
import RenderRoutes from './router';


import indexs from '../views/index';
import p from '../views/p';
import about from '../views/about';
import archive from '../views/archive';

class index extends React.Component {
    render() {
        return (
            <Switch>
                <RenderRoutes path="/index" component={indexs} />
                <RenderRoutes path="/about" component={about} />
                <RenderRoutes path="/p/:id" component={p} />
                <RenderRoutes path="/archive" component={archive} />
                <Redirect from="/" to="/index" />
            </Switch>
        )
    }
}

export default withRouter(index)