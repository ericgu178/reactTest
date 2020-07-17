import { Route, Redirect } from "react-router-dom";
import React from "react";

// 循环渲染当前路由数组中一维数组中的组件 返回的是 Route 路由
export const RenderRoutes = ({ routes }) => {
    return (
        routes.map((route, i) => {
            if (route.redirect) {
                return <RedirectWithSubRoutes key={i} {...route} />
            } else {
                return <RouteWithSubRoutes key={i} {...route} />
            }
        })
    )
};

// 重定向
const RedirectWithSubRoutes = route => {
    return (<Redirect
        exact={route.exact}
        from={route.from}
        to={{
            pathname: route.to,
        }}
    />
    )
}

// 路由渲染
const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        exact={route.exact}
        render={props => <route.component {...props} />}
    />
);