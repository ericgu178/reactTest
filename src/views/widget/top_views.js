// 点击排行
import React from "react"
import { List, Card, Skeleton, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTopViews } from "../../store/actions/index"
import { connect } from 'react-redux';
import { RiseOutlined } from "@ant-design/icons"

class TopViews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '点击排行',
            ...props
        }
    }

    static fetch(store) {
        return store.dispatch(fetchTopViews())
    }

    render() {
        return (
            <div className="widget" style={styles.topviews}>
                <Card title={<><RiseOutlined/> {this.state.title}</>} bordered={false}>
                    <Skeleton loading={this.state.loading}>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.data}
                            renderItem={item => (
                                <a href={'/p/' + item.id}>
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
                                        title={item.blog_title.length > 40 ? item.blog_title.substr(0, 40) + '...' : item.blog_title}
                                    />
                                </List.Item>
                                </a>
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
const mapStateToProps = (state) => ({
    data:state.TopViews.topViewsData,
    url:state.TopViews.url
});
const mapDispatchToProps = {
    fetchTopViews:fetchTopViews
}
// 校验数据
TopViews.propTypes = {
    data:PropTypes.array.isRequired,
    url:PropTypes.string.isRequired
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TopViews));
