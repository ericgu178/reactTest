// 标签云
import React from "react";
import { Tag, Card } from "antd";
import { getTag } from "../../api/index"
class TagCloud extends React.Component {
    state = {
        title: '标签云',
        data: []
    }
    componentDidMount() {
        this.getContent();
    }
    async getContent() {
        let result = await getTag();
        const data = [];
        result.data.filter(item => {
            data.push({
                id: item.id,
                color: item.color,
                title: item.label_name
            })
        })
        this.setState({ data: data })
    }
    // 跳转 tag 页
    onChangeTag(item) {
        console.log(item)
    }
    render() {
        const tags = this.state.data.map(item => {
            return (
                <Tag onClick={this.onChangeTag.bind(this, item)} style={{ marginBottom: '1vh' }} key={item.title} color={item.color}><span style={{ fontSize: '16px', fontWeight: 'bold', padding: '1vh', display: 'inline-block' }}>{item.title}</span></Tag>
            )
        })
        return (
            <div className="widget">
                <Card title={this.state.title} bordered={false}>
                    {tags}
                </Card>
            </div>
        )
    }
}

export default TagCloud