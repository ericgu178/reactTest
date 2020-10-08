import React from 'react'
import { Route, Redirect, } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        // document.title = rest.title || "EricGU178 个人博客";
        return (
            !!true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
        )}
    } />
)

export default PrivateRoute;