import React from 'react';
import { Space, Typography, Divider, Affix, Skeleton } from 'antd';
import { ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import marked from 'marked';
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Subscribe from '../widget/subscribe';
import './p.css';
import Comment from "./comment";
import RArticles from "./related_articles";
import { getP } from "../../api/index";
import { withRouter } from 'react-router-dom';

const { Title, Paragraph } = Typography
class P extends React.Component {
    state = {
        data: {},
        html: '',
        loading: true
    }
    componentDidMount() {
        this.getContent({ id: this.props.match.params.id });
    }
    async getContent(params = {}) {
        let result = await getP(params);
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        });

        let html = marked(result.data.blog_content);
        this.setState({
            data: result.data,
            html: html,
            loading: false
        });
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
                        <div className="p_comment">
                            <Comment />
                        </div>
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
export default withRouter(P);