// 关注
import React from "react";
import { Card } from "antd";
class Subscribe extends React.Component {
    state = {
        title: '关注我的公众号'
    }
    render() {
        return (
            <div className="widget">
                <Card title={this.state.title} bordered={false}>
                    <img alt="公众号图片" style={{width:'100%'}} draggable={false} src={require('../../assets/images/wx2.jpg')} />
                </Card>
            </div>
        )
    }
}

export default Subscribe