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
    htmlDecode(str) {
         /*4.用正则表达式实现html解码*/
        var s = "";
        console.log(str);
        if(str.length === 0) return "";
        s = str.replace(/&amp;/g,"&");
        s = s.replace(/&lt;/g,"<");
        s = s.replace(/&gt;/g,">");
        s = s.replace(/&nbsp;/g," ");
        s = s.replace(/&quot;/g,"\"");
        return s; 
    }
    async getContent(params = {}) {
        let result = await getP(params);
        const renderer = {
            html:html => {
                return this.htmlDecode(html)
            }
        }
        marked.use({renderer});
        marked.setOptions({
            // renderer: new marked.Renderer(),
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
        console.log(result.data.blog_content,'123123123')
        let html = marked(result.data.blog_content);
        document.title = result.data.blog_title
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
export default withRouter(P);