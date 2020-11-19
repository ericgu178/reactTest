import React from "react";
import { withRouter } from 'react-router-dom';
import { List,Skeleton,Alert  } from "antd";
import { fetchSearch } from "../../store/actions/search";
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
        await store.dispatch(fetchSearch(query))
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
                    style={{background:'#121212',marginTop:'20px'}}
                    itemLayout="vertical"
                    size="large"
                    loading={this.state.loading}
                    dataSource={listData}
                    renderItem={item => (
                        <Skeleton loading={this.state.loading} active>
                        <div className="re">
                            <a href={`/p/${item.id}`} key={index}>
                            <div style={style.title}>{item.blog_title}</div>
                            <div style={style.content}>{item.blog_describe}</div>
                            <div style={style.bottom}>
                                <div>阅读 {item.reads}次</div>
                                <div>发布时间 {item.create_time}</div>
                            </div>
                            </a>
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
        borderBottom:'1px solid #7d7d7d'
    },
    title:{
        color:'#fff',
        fontSize:'1.25rem',
        marginBottom: '.5rem',
        fontWeight: 600,
        lineHeight: 1.2
    },
    content: {
        display: '-webkit-box',
        lineHeight: 1.8,
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        wordWrap:'break-word',
        color:'#7d7d7d',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize:'15px'
    },
    bottom: {
        marginTop:'10px',
        display:'flex',
        justifyContent:'space-between',
        fontSize:'16px',
        color:'#999'
    }
}

const mapStateToProps = (state) => ({
    data:state.Search.data,
    loading:state.Search.loading,
});
const mapDispatchToProps = {
    fetchSearch:fetchSearch
}
// 校验数据
index.propTypes = {
    data:PropTypes.array.isRequired,
    loading:PropTypes.bool.isRequired
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(index));