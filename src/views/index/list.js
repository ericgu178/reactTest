import React from 'react'
import { List, Space, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ClockCircleOutlined, EyeOutlined, TagOutlined } from '@ant-design/icons';
import { fetchArtList } from "../../store/actions/index"
import { connect } from 'react-redux';

class list extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ...props
        }
	}
    static fetch(store,params){
        return store.dispatch(fetchArtList(params))
    }
    onClick(item) {
        return this.props.history.push(item.href)
    }
    onChange = async (page) => {
        this.setState({ loading: true, contentLoading: true })
        this.props.history.push(`/index?page=${page}`)
        await this.props.fetchArtList({page:page});
        this.setState({...this.props})
        this.setState({ loading: false, contentLoading: false })
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
const mapStateToProps = (state) => ({
    listData:state.ArtList.listData,
    pageSize:state.ArtList.pageSize,
    loading:state.ArtList.loading,
    contentLoading:state.ArtList.contentLoading,
    url:state.ArtList.url,
    pageTotal: state.ArtList.pageTotal,
});
const mapDispatchToProps = {
    fetchArtList:fetchArtList
}
  
list.propTypes = {
    listData:PropTypes.array.isRequired,
    pageSize:PropTypes.number.isRequired,
    loading:PropTypes.bool.isRequired,
    contentLoading:PropTypes.bool.isRequired,
    url:PropTypes.string.isRequired,
    pageTotal: PropTypes.number.isRequired,
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(list));