import React from "react";
import { Typography } from "antd";
import Subscribe from '../widget/subscribe';
import './about.css';

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
                    <div className="left" style={{ background: '#121212', padding: '2vh' }}>
                        <Typography>
                            <Title style={{color:'#fff'}} level={this.state.level}>关于我<span role="img" aria-label="donut">💻</span></Title>
                            <Paragraph style={{color:'#fff'}}>
                                <ul>
                                    <li>代码不精<span role="img" aria-label="donut">😛</span></li>
                                    <li>封装无力<span role="img" aria-label="donut">😜</span></li>
                                    <li>架构松散<span role="img" aria-label="donut">😨</span></li>
                                    <li>debug迟缓<span role="img" aria-label="donut">😫</span></li>
                                    <li>处处埋坑<span role="img" aria-label="donut">😤</span></li>
                                </ul>
                            </Paragraph>
                            <Title style={{color:'#fff'}} level={this.state.level}>关于网站<span role="img" aria-label="donut">⌨️</span></Title>
                            <Paragraph style={{color:'#fff'}}>
                                <Text strong>为了学习React的使用，在加上有如下方面需求。所以使用React写个网站练手用来。</Text>

                                <p>关于这个网站，平常工作遇到的问题都写在了笔记本里，
                                后来感觉不好翻看查阅，就想着弄一个博客出来。
                                随笔记录一下也方便，看的也方便。顺便分享自己遇到的问题所用的解决方案。</p>

                            </Paragraph>
                            <Title style={{color:'#fff'}} level={this.state.level}>技术栈<span role="img" aria-label="donut">🎨</span></Title>
                            <Paragraph style={{color:'#fff'}}>
                                <ul>
                                    <li>Webpack</li>
                                    <li>React.js</li>
                                    <li>React-redux</li>
                                    <li>React-router</li>
                                    <li>Babel7.0</li>
                                    <li>Koa</li>
                                    <li>Ant UI</li>
                                    <li>Php</li>
                                </ul>
                            </Paragraph>
                            <Title style={{color:'#fff'}} level={this.state.level}>我是一个平凡的打工仔<span role="img" aria-label="donut">🖖</span></Title>
                            <Paragraph style={{color:'#fff'}}>
                                <h4 style={{color:'#fff'}}>我有这么几条心得分享一下</h4>
                                <p><Text strong style={{color:'#fff'}}>三"不"原则:不知道、不清楚、我帮您问问</Text></p>
                                <p>不想干的事:过会给您回电话（上午的事下午落实，下午的事明天再说） 多喝水、多拉屎，能坐一会儿是一会儿</p>
                                <p>联系间隔2层楼内的同事打电话，直接拿着本子和笔去找人，说话要慢，脑子要迟钝，让他多解释几遍</p>
                            </Paragraph>
                            <Title style={{color:'#fff'}} level={this.state.level}>其他<span role="img" aria-label="donut">🏄‍♂️</span></Title>
                            <Paragraph style={{color:'#fff'}}>
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