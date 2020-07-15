import React from "react";
import { Card } from "antd";
// 相关文章
class RArticles extends React.Component {
    state = {
        title: '相关文章'
    }
    render() {

        return (
            <>
                <Card title={this.state.title}>
                    123
                </Card>
            </>
        )
    }
}

export default RArticles;