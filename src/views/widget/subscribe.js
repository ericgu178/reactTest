// 关注
import React from "react";
import { Card } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
class Subscribe extends React.Component {
    state = {
        title: '关注我的公众号'
    }
    render() {
        return (
            <div className="widget">
                <Card title={<><QrcodeOutlined/> {this.state.title}</>} bordered={false}>
                    <img alt="公众号图片" style={{width:'100%'}} draggable={false} src={require('../../assets/images/wx2.jpg')} />
                </Card>
            </div>
        )
    }
}

export default Subscribe;