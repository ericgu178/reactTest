import React from "react";
import './main.css';
import { Layout } from "antd";
import { UserOutlined, VideoCameraOutlined,StepBackwardOutlined } from '@ant-design/icons';
import Menus from "./common/menu";
import Router from "../router/index";
import Search from "./common/search";
const menus = [{
    path:'/index',
    title:'首页',
    icon:<StepBackwardOutlined/>,
},{
    path:'/about',
    title:'关于',
    icon:<UserOutlined/>,
},{
    path:'/other',
    title:'其他',
    icon:<VideoCameraOutlined/>,
},{
    path:'/archive',
    title:'归档',
    icon:<UserOutlined/>,
},{
    path:'/cangku',
    title:'仓库',
    icon:<UserOutlined/>,
}]
const {Header,Content,Footer} = Layout;


class Main extends React.Component {
    render() {
        return (
            <Layout>
                <Header className="header" style={{ padding: 0 }}>
                    <div className="wai_logo">
                        <div className="logo" />
                    </div>
                    <div className="wai_center">
                        <Menus mode="horizontal" theme="light" menus={menus} />
                    </div>
                    <div className="wai_search">
                        <Search/>
                    </div>
                </Header>
                <Content>
                    <div className="main_center" style={{ padding: 10, minHeight: 600 ,backgroundColor:'rgba(0,0,0,0)'}}>
                        <Router />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center',backgroundColor:'skyblue' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default Main;