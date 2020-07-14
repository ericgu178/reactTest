// 点击排行
import React from "react"
import { List, Card ,Skeleton , Space } from 'antd';
import { ClockCircleOutlined, EyeOutlined , TagOutlined } from '@ant-design/icons';
// import {getTopViews} from "../../api/index"
class TopViews extends React.Component {
    state = {
        title:'点击排行',
        loading:true,
        data:[]
    }

    // dom加载完毕钓鱼
    componentDidMount() {
        const data = [
            {
              title: 'Ant Design Title 1',
            },
            {
              title: 'Ant Design Title 2 Title Title Title Title Title',
            },
            {
              title: 'Ant Design Title 3',
            },
            {
              title: 'Ant Design Title 4',
            },
          ];
          this.setState({data:data,loading:false})
    }

    // 获取数据
    async getContent() {
        // let data = await getTopViews();
        // this.setState({data:data.result})
    }
    render() {
        return (
            <div className="widget" style={styles.topviews}>
                <Card title={this.state.title} bordered={false}>
                <Skeleton loading={this.state.loading}>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <Space key='2'>
                                    {<ClockCircleOutlined/>}
                                    {200}
                                </Space>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<img style={{width:'10vh',height:'100%',objectFit:'cover'}} alt="logo" src="http://seopic.699pic.com/photo/50035/0520.jpg_wh1200.jpg"/>}
                                title={<a href="https://ant.design">{item.title.length > 40 ? item.title.substr(0,40) + '...' : item.title}</a>}
                            />
                        </List.Item>
                    )}
                />
                </Skeleton>
                </Card>
            </div>
        )
    }
}

const styles = {
    topviews: {
        background:'#fff'
    }
}

export default TopViews
