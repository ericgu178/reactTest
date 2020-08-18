import React from "react";
import { withRouter } from 'react-router-dom';
import { List,Skeleton,Alert  } from "antd";
import { searchLabelList } from "../../api/index";
import TagCloud from '../widget/tag_cloud';
import Subscribe from '../widget/subscribe';


class index extends React.Component {
    state = {
        title: '相关文章',
        loading:true,
        data:[],
        count:0,
        keyboard:''
    }
    componentDidMount() {
        this.getContent(this.props.match.params.id,this.props.match.params.title)
    }
    async getContent(id,title) {
        let result = await searchLabelList({label_id:id,label_name:title});
        console.log(result)
        this.setState({
            loading:false,
            data:result.data.search_list,
            count:result.data.count,
            keyboard:result.data.keyboard
        })
    }
    toP(item) {
        return this.props.history.push(`/p/${item.id}`)
    }
    render() {
        const listData = this.state.data;
        return (
            <div className="main_content">
                <div className="left">
                    <Alert
                        message={'共检索到 ' + this.state.count + ' 条数据'}
                        description={'标签：' + this.state.keyboard}
                        type="success"
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
                </div>
                <div className="right">
                    <TagCloud />
                    <Subscribe />
                </div>
            </div>
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
        marginTop:'10px',
        display:'flex',
        justifyContent:'space-between',
        fontSize:'16px'
    }
}
export default withRouter(index);