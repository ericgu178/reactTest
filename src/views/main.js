import React from "react";
import './main.css';
import { Layout } from "antd";
import { UserOutlined, MenuOutlined, HomeOutlined,HistoryOutlined,ApartmentOutlined,PictureOutlined,CameraOutlined } from '@ant-design/icons';
import Menus from "./common/menu";
import Router from "../router/index";
import Search from "./common/search";
import Aplayer from "./widget/aplayer"
const menus = [{
    path: '/index',
    title: '首页',
    icon: <HomeOutlined />,
}, {
    path: '/about',
    title: '关于',
    icon: <UserOutlined />,
}, {
    path: '/other',
    title: '其他',
    icon: <MenuOutlined />,
    subs:[{
        path: '/biying',
        title: '必应每日图片',
        icon: <PictureOutlined />,
    }]
}, {
    path: '/archive',
    title: '归档',
    icon: <HistoryOutlined />,
}, {
    path: '/cangku',
    title: '仓库',
    icon: <ApartmentOutlined />,
}, {
    path: '/img',
    title: '照片墙',
    icon: <CameraOutlined />,
}]
const { Header, Content, Footer } = Layout;


class Main extends React.Component {
    render() {
        return (
            <Layout>
                <Header className="header" style={{ padding: 0 }}>
                    <div className="wai_logo">
                        <div className="logo" >
                            EricGU<span className="logo_pro">178</span>
                        </div>
                    </div>
                    <div className="wai_center">
                        <Menus mode="horizontal" theme="light" menus={menus} />
                    </div>
                    <div className="wai_search">
                        <Search />
                    </div>
                </Header>
                <Content>
                    <div className="main_center" style={{ padding: 10, minHeight: 600, backgroundColor: 'rgba(0,0,0,0)' }}>
                        <Router />
                    </div>
                    {/* <Aplayer></Aplayer> */}
                </Content>
                <Footer style={{ textAlign: 'center',fontSize:'18px','color':'#fff', backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    © 2019 - 2020 Copyright
                    <br></br>
                    <a href="." style={{color:'#fff'}}>EricGU178个人博客 All Rights Reserved.</a>
                    <br></br>
                    备案号: 冀ICP备19024869号-1
                </Footer>
            </Layout>
        )
    }
}

export default Main;