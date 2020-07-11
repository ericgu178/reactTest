import {Route} from "react-router-dom";
import React from "react";

// 循环渲染当前路由数组中一维数组中的组件 返回的是 Route 路由
export const RenderRoutes = ({routes}) => {
    console.log(routes)
    return (
        routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
    )
};

// 渲染当前组件
export const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        exact={route.exact}
        render={props =>{
            return (
                <route.component {...props} routes={route?.routes} />
            )
        }}
    />
);