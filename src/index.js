import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Switch,Route } from 'react-router-dom'
import index from "./views/main"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={index}></Route>
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
)