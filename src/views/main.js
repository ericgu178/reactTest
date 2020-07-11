import React from "react";
import './main.css';
import { Layout } from "antd";
import { UserOutlined, VideoCameraOutlined,StepBackwardOutlined } from '@ant-design/icons';
import Menus from "./common/menu";
import Router from "../router/index";
const menus = [{
    path:'/a',
    title:'父亲',
    icon:<StepBackwardOutlined/>,
    subs:[{
        path:'/a2',
        title:'儿子',
        icon:<VideoCameraOutlined/>,
        subs:[{
            path:'/index',
            title:'孙子',
            icon:<VideoCameraOutlined/>,
        }]
    }]
},{
    path:'/a2',
    title:'woca',
    icon:<UserOutlined/>,
}]
const {Header,Content,Sider,Footer} = Layout;


class Main extends React.Component {
    render() {
        return (
            <Layout>
                <Header className="header" style={{ padding: 0 }}>
                    <div className="wai_logo">
                        <div className="logo" />
                    </div>
                    <div className="wai_center">
                        <Menus mode="horizontal" menus={menus} />
                    </div>
                    <div className="wai_search">
                        <Menus mode="horizontal" menus={menus} />
                    </div>
                </Header>
                    <Content>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 600, backgroundColor:'#0f0'}}>
                            <Router />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center',backgroundColor:'skyblue' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default Main;