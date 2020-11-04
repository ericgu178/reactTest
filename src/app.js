import { Provider } from 'react-redux';
import React from "react";
import { BrowserRouter , Switch, Route } from 'react-router-dom'
import index from "./views/main"
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';

class App extends React.Component {
    render() {
        const { store,local } = this.props
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <ConfigProvider locale={local}>
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