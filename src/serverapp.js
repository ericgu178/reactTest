import { Provider } from 'react-redux';
import React from "react";
import { StaticRouter , Switch, Route } from 'react-router-dom'
import index from "./views/main"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { ConfigProvider } from 'antd';
// 服务器serverapp
class App extends React.Component {
    render() {
        const { store } = this.props
        return (
            <StaticRouter>
                <Provider store={store}>
                    <ConfigProvider locale={this.props.local}>
                        <Switch>
                            <Route path="/" component={index} />
                        </Switch>
                    </ConfigProvider>
                </Provider>
            </StaticRouter>
        );
    }
}

export default App;