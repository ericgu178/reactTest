// 点击排行
import React from "react"
import { List, Card, Skeleton, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { getTopViews } from "../../api/index"
class TopViews extends React.Component {
    state = {
        title: '点击排行',
        loading: true,
        data: []
    }

    // dom加载完毕钓鱼
    componentDidMount() {
        this.getContent();
    }

    onClick(id) {
        return this.props.history.push(`/p/${id}`)
    }

    // 获取数据
    async getContent() {
        let result = await getTopViews();
        this.setState({ data: result.data, loading: false })
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
                                    key={item.blog_title}
                                    actions={[
                                        <Space key='2'>
                                            {<EyeOutlined />}
                                            {item.reads}
                                        </Space>
                                    ]}
                                >
                                    <List.Item.Meta
                                        style={{ cursor: 'pointer' }}
                                        onClick={this.onClick.bind(this, item.id)}
                                        avatar={<img style={{ width: '10vh', height: '100%', objectFit: 'cover' }} alt="logo" src={window._.baseUrl + item.material_id.filepath} />}
                                        title={item.blog_title.length > 40 ? item.blog_title.substr(0, 40) + '...' : item.blog_title}
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
        background: '#fff'
    }
}

export default withRouter(TopViews)
