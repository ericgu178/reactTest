import React from "react";
import { withRouter } from 'react-router-dom';
import { List,Skeleton,Alert  } from "antd";
import TagCloud from '../widget/tag_cloud';
import Subscribe from '../widget/subscribe';
import { fetchTagArticle } from "../../store/actions/search";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    static async fetch(store,query) {
        await store.dispatch(fetchTagArticle(query))
        await TagCloud.fetch(store)
    }

    toP(item) {
        window.location.href = `/p/${item.id}`;
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
        display: '-webkit-box',
        lineHeight: 1.8,
        lineClamp: 3,
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        wordWrap:'break-word',
        color:'#6c757d',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize:'15px'
    },
    bottom: {
        marginTop:'10px',
        display:'flex',
        justifyContent:'space-between',
        fontSize:'16px'
    }
}

const mapStateToProps = (state) => ({
    count:state.TagArticle.count,
    data:state.TagArticle.data,
    keyboard:state.TagArticle.keyboard,
    loading:state.TagArticle.loading,
});
const mapDispatchToProps = {
    fetchTagArticle:fetchTagArticle
}
// 校验数据
index.propTypes = {
    count:PropTypes.number.isRequired,
    data:PropTypes.array.isRequired,
    keyboard:PropTypes.string.isRequired,
    loading:PropTypes.bool.isRequired
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(index));