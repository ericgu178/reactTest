import React from 'react';
import { Space, Typography, Divider, Affix, Skeleton } from 'antd';
import { ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import 'highlight.js/styles/monokai-sublime.css';
import Subscribe from '../widget/subscribe';
import './p.css';
import Comment from "./comment";
import RArticles from "./related_articles";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchP } from "../../store/actions/p"
import { connect } from 'react-redux';
const { Title, Paragraph } = Typography
class P extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        }
    }

    static async fetch(store,query) {
        await store.dispatch(fetchP(query))
        let data = store.getState().P.data;
        await Comment.fetch(store,{id:data.id})
        await RArticles.fetch(store,data.label_pk_ids)
    }

    componentDidMount() {
        document.title = this.state.data.blog_title        
    }
    render() {
        const html = this.state.html
        return (
            <>
                <div className="main_content">
                    <div className="left">
                        {/* 显示html代码 */}
                        <div className="p_content" style={styles.left}>
                            <Skeleton paragraph={{
                                rows: 40
                            }} loading={this.state.loading}>
                                <Typography>
                                    <Title level={1} type="warning" >{this.state.data.blog_title}</Title>
                                    <Space>
                                        <Space><ClockCircleOutlined />{this.state.data.create_time}</Space>
                                        <Space><EyeOutlined />{this.state.data.reads}</Space>
                                    </Space>
                                    <Divider />
                                    <Paragraph>
                                        <div dangerouslySetInnerHTML={{ __html: html }} />
                                    </Paragraph>
                                </Typography>
                            </Skeleton>
                        </div>
                        <Skeleton paragraph={{
                                rows: 10
                            }} loading={this.state.loading}>
                        <div className="p_comment">
                            <Comment id={this.props.match.params.id}/>
                        </div>
                        </Skeleton>
                        <Skeleton paragraph={{
                                rows: 40
                            }} loading={this.state.loading}>
                        <div className="p_ra">
                            <RArticles labelPkIds={this.state.data.label_pk_ids}/>
                        </div>
                        </Skeleton>
                    </div>
                    <div className="right">
                        <Affix offsetTop={20}>
                            <Subscribe />
                        </Affix>
                    </div>
                </div>
            </>
        )
    }
}
const styles = {
    left: {
        background: '#fff',
        padding: '2vh',
    }
}
const mapStateToProps = (state) => ({
    data:state.P.data,
    html:state.P.html,
    loading:state.P.loading,
});
const mapDispatchToProps = {
    fetchP:fetchP
}
// 校验数据
P.propTypes = {
    data:PropTypes.object.isRequired,
    html:PropTypes.string.isRequired,
    loading:PropTypes.bool.isRequired
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(P));
