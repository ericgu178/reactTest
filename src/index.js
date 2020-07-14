import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store/index'
import './config'
import { BrowserRouter, Switch,Route } from 'react-router-dom'
import index from "./views/main"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route path="/" component={index} />
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
)