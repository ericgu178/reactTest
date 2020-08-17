import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store/index'
import './config'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import index from "./views/main"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <Switch>
                    <Route path="/" component={index} />
                </Switch>
            </ConfigProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
)