import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import App from "./app"
import './config'
import zhCN from 'antd/es/locale/zh_CN';
ReactDOM.render(
    <App local={zhCN}/>,
    document.getElementById("root")
)
serviceWorker.unregister();