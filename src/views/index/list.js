import React from 'react'
import { List, Space, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ClockCircleOutlined, EyeOutlined, TagOutlined } from '@ant-design/icons';
import { fetchArtList } from "../../store/actions/index"
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

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

    onChange = async (page) => {
        window.location.href = `/index?page=${page}`
    }

    handleImageLoaded(stateField) {
        const temp = {}
        temp[stateField] = true
        this.setState(temp);
    }
     
    handleImageErrored(stateField) {
        const temp = {}
        temp[stateField] = false
        this.setState(temp);
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
                        current:this.state.current,
                        onChange: this.onChange.bind(this),
                        pageSize: this.state.pageSize,
                        total: this.state.pageTotal
                    }}
                    dataSource={listData}
                    renderItem={(item,index) => (
                        <Skeleton loading={this.state.contentLoading} title active avatar >
                            <a href={item.href} key={index}>
                            <List.Item
                                className="list"
                                actions={[
                                    <IconText icon={ClockCircleOutlined} text={moment(item.create_time).fromNow()} key="list-vertical-like-o" />,
                                    <IconText icon={EyeOutlined} text={item.reads} key="list-vertical-message" />,
                                    <IconText icon={TagOutlined} text={item.tags} key="list-vertical-like-tag" />,
                                ]}
                                extra={
                                    <div style={{width:'100%',height:'100%',position:'relative',cursor:'zoom-in'}}>
                                    <img draggable="false" 
                                        onLoad={this.handleImageLoaded.bind(this,'p' + index)}
                                        onError={this.handleImageErrored.bind(this,'p' + index)}
                                        style={{ objectFit: 'cover',boxShadow: '4px 6px 10px rgba(0,0,0,.4)',borderRadius:'10px' }} width={272} height="100%" alt={item.img} src={item.img} />
                                    <a href={item.href} className="mark" style={{opacity:this.state['p' + index] === true ? 0 : 1}}> </a>
                                    </div>
                                }
                            >
                                <List.Item.Meta
                                    title={<span style={{ cursor: 'pointer', color: '#000', fontSize: '20px', fontWeight: 'bold' }}>{item.title}</span>}
                                    description={item.description}
                                />
                            </List.Item>
                            </a>
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
    current: state.ArtList.current
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
    current: PropTypes.number.isRequired
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(list));