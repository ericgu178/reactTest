import React from "react";
import { Typography } from "antd";
import Subscribe from '../widget/subscribe';
import './about.css';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

/**
 * 关于的页面
 */
class About extends React.Component {
    state = {
        level: 2
    }
    render() {
        return (
            <>
                <div className="main_content">
                    <div className="left" style={{ background: '#fff', padding: '2vh' }}>
                        <Typography>
                            <Title level={this.state.level} copyable={{ icon: <SmileOutlined /> }}>关于我</Title>
                            <Paragraph>
                                <ul>
                                    <li>代码不精</li>
                                    <li>封装无力</li>
                                    <li>架构松散</li>
                                    <li>debug迟缓</li>
                                    <li>处处埋坑</li>
                                </ul>
                            </Paragraph>
                            <Title level={this.state.level}>关于网站</Title>
                            <Paragraph>
                                <Text strong>为了学习react的使用，在加上有如下方面需求。所以使用react写了个网站出来练手。</Text>

                                <p>关于这个网站，平常工作遇到的问题都写在了笔记本里，
                                后来感觉不好翻看查阅，就想着弄一个博客出来。
                                随笔记录一下也方便，看的也方便。</p>

                                此网站后台使用 <Text code>php</Text> 编写完成。
                            </Paragraph>
                            <Title level={this.state.level}>我是一个平凡的打工仔</Title>
                            <Paragraph>
                                <h4>我有这么几条心得分享一下</h4>
                                <p><Text strong>三"不"原则:不知道、不清楚、我帮您问问</Text></p>
                                <p>不想干的事:过会给您回电话（上午的事下午落实，下午的事明天再说） 多喝水、多拉屎，能坐一会儿是一会儿</p>
                                <p>联系间隔2层楼内的同事打电话，直接拿着本子和笔去找人，说话要慢，脑子要迟钝，让他多解释几遍</p>
                            </Paragraph>
                            <Title level={this.state.level}>其他</Title>
                            <Paragraph>
                                我是一个有头发的码农。
                            </Paragraph>
                        </Typography>
                    </div>
                    <div className="right">
                        <Subscribe />
                    </div>
                </div>

            </>
        )
    }
}

export default About;