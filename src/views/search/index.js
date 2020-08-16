import React from "react";
import { withRouter } from 'react-router-dom';
import { List,Skeleton,Alert  } from "antd";
import { search } from "../../api/index";



class index extends React.Component {
    state = {
        title: '相关文章',
        loading:true,
        data:[]
    }
    componentDidMount() {
        this.getContent(this.props.match.params.q)
    }
    async getContent(q) {
        let result = await search({q:q})
        this.setState({loading:false,data:result.data})
    }
    toP(item) {
        return this.props.history.push(`/p/${item.id}`)
    }
    render() {
        const listData = this.state.data;
        const { q } = this.props.match.params;
        return (
            <>
                <Alert
                    message="输入的搜索内容为"
                    description={q}
                    type="warning"
                />
                <List
                    style={{background:'#fff',marginTop:'20px'}}
                    itemLayout="vertical"
                    size="large"
                    loading={this.state.loading}
                    dataSource={listData}
                    renderItem={item => (
                        <Skeleton loading={this.state.loading} active>
                        <div className="re" onClick={this.toP.bind(this,item)}>
                            <div style={style.title}>{item.blog_title}</div>
                            <div style={style.content}>{item.blog_describe}</div>
                            <div style={style.bottom}>
                                <div>阅读 {item.reads}次</div>
                                <div>发布时间 {item.create_time}</div>
                            </div>
                        </div>
                        </Skeleton>
                    )}
                />
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
        fontSize:'2rem',
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
        marginTop:'10px',
        display:'flex',
        justifyContent:'space-between',
        fontSize:'16px'
    }
}
export default withRouter(index);