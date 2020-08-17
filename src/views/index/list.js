import React from 'react'
import { List, Space, Skeleton } from 'antd';
import { withRouter } from 'react-router-dom';

import { ClockCircleOutlined, EyeOutlined, TagOutlined } from '@ant-design/icons';
import { getContent } from "../../api/index";
class list extends React.Component {
    state = {
        listData: [],
        loading: true,
        contentLoading: true,
        pageSize: 10,
        pageTotal: 0
    }

    componentDidMount() {
        this.getContent()
        this.setState({ contentLoading: false })
    }

    async getContent(search = {}) {
        let data = await getContent(search)
        this.setState({ loading: false, contentLoading: false })
        const result = [];
        data.data.filter(item => {
            const tags = [];
            item.label_pk_ids.filter(tag => {
                tags.push(tag.label_name)
            })
            result.push({
                href: `/p/${item.id}`,
                title: item.blog_title,
                description: item.blog_describe.length > 120 ? item.blog_describe : item.blog_content.substr(0, 200),
                create_time: item.create_time,
                reads: item.reads,
                img: `${window._.baseUrl}/${item.material_id.filepath}`,
                tags: tags.join(',')
            })
        })

        this.setState({ listData: result, pageTotal: data.total })
    }
    onClick(item) {
        return this.props.history.push(item.href)
    }

    onChange = (page) => {
        this.setState({ loading: true, contentLoading: true })
        this.getContent({ page: page })
    }

    render() {
        const listData = this.state.listData;
        const IconText = ({ icon, text }) => (
            <Space>
                {React.createElement(icon)}
                {text}
            </Space>
        );
        return (
            <>
                <List
                    loading={this.state.loading}
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: this.onChange.bind(this),
                        pageSize: this.state.pageSize,
                        total: this.state.pageTotal
                    }}
                    dataSource={listData}
                    renderItem={item => (
                        <Skeleton loading={this.state.contentLoading} title active avatar >

                            <List.Item
                                onClick={this.onClick.bind(this, item)}
                                className="list"
                                key={item.title}
                                actions={[
                                    <IconText icon={ClockCircleOutlined} text={item.create_time} key="list-vertical-like-o" />,
                                    <IconText icon={EyeOutlined} text={item.reads} key="list-vertical-message" />,
                                    <IconText icon={TagOutlined} text={item.tags} key="list-vertical-like-tag" />,
                                ]}
                                extra={
                                    <img draggable="false" style={{ objectFit: 'cover', paddingRight: '1vh' }} width={272} height="100%" alt={item.img} src={item.img} />
                                }
                            >

                                <List.Item.Meta
                                    title={<span style={{ cursor: 'pointer', color: '#000', fontSize: '20px', fontWeight: 'bold' }}>{item.title}</span>}
                                    description={item.description}
                                />
                            </List.Item>
                        </Skeleton>
                    )}
                />
            </>
        )
    }
}


const styles = {
    list: {
        background: '#fff',
        cursor: 'pointer'
    },
    meta: {
        cursor: 'pointer'
    }
}
export default withRouter(list);