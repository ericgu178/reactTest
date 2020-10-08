import React from "react";
import ReactDOM from "react-dom";
import counterApp from './store/reducers'
import { createStore } from 'redux'

import * as serviceWorker from './serviceWorker';
import App from "./app"
import './config'
import zhCN from 'antd/es/locale/zh_CN';

// 通过服务端注入的全局变量得到初始 state
const preloadedState = window.__INITIAL_STATE__
console.log(preloadedState)
// 使用初始 state 创建 Redux store
const store = createStore(counterApp, preloadedState)


ReactDOM.render(
    <App local={zhCN} store={store}/>,
    document.getElementById("root")
)
serviceWorker.unregister();