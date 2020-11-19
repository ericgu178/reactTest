import React from "react";
import { Card,List } from "antd";
import { ApartmentOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchRelated } from "../../store/actions/p"
import { connect } from 'react-redux';
// 相关文章
class RArticles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            title: <><ApartmentOutlined /> 相关文章</>
        }
    }
    static fetch(store,params) {
        return store.dispatch(fetchRelated(params))
    }

    render() {
        const listData = this.state.data
        return (
            <>
                <Card title={this.state.title} bordered={false}>
                <List
                    loading={this.state.loading}
                    itemLayout="vertical"
                    size="large"
                    dataSource={listData}
                    renderItem={item => (
                        <div className="re">
                            <a href={`/p/${item.id}`}>
                                <div style={style.title}>{item.blog_title}</div>
                                <div style={style.content}>{item.blog_describe}</div>
                                <div style={style.bottom}>
                                    <div style={{color:'#fff'}}>浏览 {item.reads} 次</div>
                                </div>
                            </a>
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
        color:'#fff',
        fontSize:'1.25rem',
        marginBottom: '.5rem',
        fontWeight: 600,
        lineHeight: 1.2
    },
    content: {
        display: '-webkit-box',
        lineHeight: 1.8,
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        wordWrap:'break-word',
        color:'#6c757d',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize:'15px'
    },
    bottom: {
        marginTop:'10px'
    }
}
const mapStateToProps = (state) => ({
    data:state.Related.data,
    loading:state.Related.loading,
});
const mapDispatchToProps = {
    fetchRelated:fetchRelated
}
// 校验数据
RArticles.propTypes = {
    data:PropTypes.array.isRequired,
    loading:PropTypes.bool.isRequired
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RArticles));