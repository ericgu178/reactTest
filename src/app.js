import { Provider } from 'react-redux';
import store from './store/index'
import React from "react";
import { BrowserRouter , Switch, Route } from 'react-router-dom'
import index from "./views/main"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { ConfigProvider } from 'antd';
// 非服务器app 普通模式 不加ssr
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <ConfigProvider locale={this.props.local}>
                        <Switch>
                            <Route path="/" component={index} />
                        </Switch>
                    </ConfigProvider>
                </Provider>
            </BrowserRouter>
        );
    }
}
export default App;