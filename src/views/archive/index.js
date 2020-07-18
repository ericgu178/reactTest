import React from "react";
import { Timeline } from "antd";
import { withRouter } from "react-router-dom";
import Subscribe from '../widget/subscribe';
import { ClockCircleOutlined } from '@ant-design/icons';
import './archive.css';
import { getArchive } from "../../api/index";

/**
 * 归档
 */
class Archive extends React.Component {
    state = {
        level: 2,
        data: [],
        curr: `${new Date().getFullYear()}`,
        datelist: []
    }
    componentDidMount() {
        console.log(this.state)
        this.getContent();
    }
    async getContent(params = {}) {
        let result = await getArchive(params);
        console.log(result)
        this.setState({ datelist: result.data, data: result.toyear })
    }
    onClick(item) {
        this.getContent({ date: item })
        this.setState({
            curr: item
        })
    }
    links(row) {
        return this.props.history.push(`/p/${row.id}`)
    }
    render() {
        const date = this.state.datelist;
        const data = this.state.data;
        return (
            <>
                <div className="main_content" style={{ minHeight: '80vh' }}>
                    <div className="left" style={{ display: 'flex', background: '#fff', padding: '2vh', width: '100%', margin: '0 auto' }}>
                        <div style={style.left}>
                            {date.map(item => (<div key={item} style={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                lineHeight: '4vh',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                background: this.state.curr === item ? 'rgb(254,154,0)' : '#000',
                                marginTop: '1vh',
                                width: '30%',
                                borderRadius: '5px',
                                color: this.state.curr === item ? '#000' : '#fff'
                            }} onClick={this.onClick.bind(this, item)}>{item}</div>))}
                        </div>
                        <div style={style.right}>
                            <Timeline mode="alternate">
                                {data.map((item, key) => (
                                    <Timeline.Item key={key}>
                                        <div style={{ backgroundColor: "#000", borderRadius: '5px', cursor: 'pointer' }} onClick={this.links.bind(this, item)}>
                                            <span style={key % 2 !== 0 ? style.o : style.l}>{key % 2 !== 0 ? item.blog_title.substr(0, 22) + '...' : item.create_time}</span>
                                            <span style={key % 2 === 0 ? style.o : style.l}>{key % 2 === 0 ? item.blog_title.substr(0, 22) + '...' : item.create_time}</span>
                                        </div>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const style = {
    left: {
        width: "20%",
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    right: {
        width: '80%',
        margin: '0 auto'
    },
    o: {
        display: 'inline-block',
        background: '#000',
        color: '#fff',
        padding: '1vh',
        borderRadius: '5px'
    },
    l: {
        display: 'inline-block',
        background: 'rgb(254,154,0)',
        color: '#000',
        padding: '1vh',
        borderRadius: '5px'
    }
}
export default withRouter(Archive);  