// 标签云
import React from "react";
import { Tag, Card,Tooltip } from "antd";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTags } from "../../store/actions/index"
import { connect } from 'react-redux';
class TagCloud extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '标签云',
            ...props
        }
    }
    static fetch(store) {
        return store.dispatch(fetchTags())
    }
    // 跳转 tag 页
    onChangeTag(item) {
        window.location.href = '/t/' + item.id + '/' + item.title
    }
    render() {
        const tags = this.state.data.map(item => {
            return (
                <Tooltip title={item.title} key={item.title}>
                    <Tag onClick={this.onChangeTag.bind(this, item)} style={{ marginBottom: '1vh',cursor:'pointer' }} key={item.title} color={item.color}><span style={{ fontSize: '16px', fontWeight: 'bold', padding: '1vh', display: 'inline-block' }}>{item.title}</span></Tag>
                </Tooltip>
            )
        })
        return (
            <div className="widget">
                <Card title={this.state.title} bordered={false}>
                    {tags}
                </Card>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    data:state.TagCloud.data,
});
const mapDispatchToProps = {
    fetchTags:fetchTags
}
// 校验数据
TagCloud.propTypes = {
    data:PropTypes.array.isRequired,
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TagCloud));
