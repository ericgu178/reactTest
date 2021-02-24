import React from "react";
import './main.css';
import { Layout } from "antd";
import { UserOutlined, HomeOutlined,HistoryOutlined,ApartmentOutlined,PictureOutlined,CameraOutlined } from '@ant-design/icons';
import Menus from "./common/menu";
import Router from "../router/index";
import Search from "./common/search";
const menus = [{
    path: '/index',
    title: '首页',
    icon: <HomeOutlined />,
}, {
    path: '/about',
    title: '关于',
    icon: <UserOutlined />,
}
// {
//     path: '/other',
//     title: '其他',
//     icon: <MenuOutlined />,
//     subs:[]
// }
, {
    path: '/archive',
    title: '归档',
    icon: <HistoryOutlined />,
}, {
    path: '/onedrive',
    title: '仓库',
    icon: <ApartmentOutlined />,
}, {
    path: '/biying',
    title: '必应每日图片',
    icon: <PictureOutlined />,
}, {
    path: '/img',
    title: '照片墙',
    icon: <CameraOutlined />,
}]
const { Header, Content, Footer } = Layout;


class Main extends React.Component {

    componentDidMount() {
       console.log([
        "%c███████╗██████╗ ██╗ ██████╗ ██████╗ ██╗   ██╗ ██╗███████╗ █████╗ ",
        "██╔════╝██╔══██╗██║██╔════╝██╔════╝ ██║   ██║███║╚════██║██╔══██╗",
        "█████╗  ██████╔╝██║██║     ██║  ███╗██║   ██║╚██║    ██╔╝╚█████╔╝",
        "██╔══╝  ██╔══██╗██║██║     ██║   ██║██║   ██║ ██║   ██╔╝ ██╔══██╗",
        "███████╗██║  ██║██║╚██████╗╚██████╔╝╚██████╔╝ ██║   ██║  ╚█████╔╝",
        "╚══════╝╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚═╝   ╚═╝   ╚════╝ "
       ].join( '\n' ),'background:#1a1a1a;color:#e0ed5e;font-weight:800;');
    }

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
                    <div className="wai_search"><Search /></div>
                </Header>
                <Content>
                    <div className="main_center" style={{ padding: 10, minHeight: 600, backgroundColor: 'rgba(0,0,0,0)' }}>
                        <Router />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center',fontSize:'18px','color':'#fff', backgroundColor: '#121212' }}>
                    © 2019 - 2020 Copyright
                    <br></br>
                    <a href="." style={{color:'#fff'}}>EricGU178个人博客 All Rights Reserved.</a>
                    <br></br>
                    备案号: <a style={{color:'#fff'}} href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">冀ICP备19024869号-1</a>
                </Footer>
            </Layout>
        )
    }
}

export default Main;