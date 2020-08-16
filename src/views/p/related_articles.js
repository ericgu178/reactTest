import React from "react";
import { Card,List } from "antd";
import {getRelevant} from "../../api/index";
import { withRouter } from 'react-router-dom';

// 相关文章
class RArticles extends React.Component {
    state = {
        title: '相关文章',
        loading:true,
        data:[]
    }
    componentDidMount() {
        const labels = []
        this.props.labelPkIds.filter(item=>{
            labels.push(item.id)
        })
        this.getContent(labels)
    }
    async getContent(label_ids) {
        let result = await getRelevant({label_pk_ids:label_ids})
        this.setState({loading:false,data:result.data})
    }
    toP(item) {
        return this.props.history.push(`/p/${item.id}`)
    }
    render() {
        const listData = this.state.data
        return (
            <>
                <Card title={this.state.title}>
                <List
                    loading={this.state.loading}
                    itemLayout="vertical"
                    size="large"
                    dataSource={listData}
                    renderItem={item => (
                        <div className="re" onClick={this.toP.bind(this,item)}>
                            <div style={style.title}>{item.blog_title}</div>
                            <div style={style.content}>{item.blog_describe}</div>
                            <div style={style.bottom}>
                                <div>阅读 {item.reads}次</div>
                            </div>
                        </div>
                    )}
                />
                </Card>
            </>
        )
    }
}
const style = {
    main: {
        display:'flex',
        flexDirection:'column',
        padding:'10px',
        borderBottom:'1px solid rgba(0,0,0,0.1)'
    },
    title:{
        color:'#000',
        fontSize:'1.25rem',
        marginBottom: '.5rem',
        fontWeight: 600,
        lineHeight: 1.2
    },
    content: {
        color:'#6c757d',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize:'14px'
    },
    bottom: {
        marginTop:'10px'
    }
}
export default withRouter(RArticles);