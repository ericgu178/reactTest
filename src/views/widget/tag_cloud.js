// 标签云
import React from "react"
import {Tag,Card} from "antd"
class TagCloud extends React.Component {
    state = {
        title:'标签云',
        data:[]
    }
    componentDidMount() {
        this.setState({data:[{color:'magenta',title:'sasdass'},
        {color:'red',title:'red'},
        {color:'volcano',title:'volcano'},
        {color:'magenta',title:'magenta'},
        {color:'orange',title:'orange'},
        {color:'pink',title:'ssssasdasdaasdasd'}]
        })
    }
    async getContent() {

    }
    // 跳转 tag 页
    onChangeTag (item) {
        console.log(item)
    }
    render() {
        const tags = this.state.data.map(item=>{
            return (
                <Tag onClick={this.onChangeTag.bind(this,item)} style={{marginBottom:'1vh'}} key={item.title} color={item.color}><a href="javacript:;" style={{color:item.color}}>{item.title}</a></Tag>
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