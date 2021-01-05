// 关注
import React from "react";
import { Card } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
class Miniprogram extends React.Component {
    state = {
        title: <><QrcodeOutlined/> 扫扫微信小程序领取优惠</>
    }
    render() {
        return (
            <div className="widget">
                <Card title={this.state.title} bordered={false}>
                    <img alt="微信小程序" style={{width:'100%'}} draggable={false} src={require('../../assets/images/wx1.jpg')} />
                </Card>
            </div>
        )
    }
}

export default Miniprogram;