import { Input } from "antd";
import React from "react";
import {withRouter} from 'react-router-dom'
const {Search} = Input;
// 搜索框

class SearchDom extends React.Component {
    // 搜索事件
    onSearch (value) {
        this.props.history.push('/search?q=' + value)
        console.log(value)
    }
    render () {
        return (
            <>
            <Search
                placeholder="输入关键字搜索"
                enterButton="搜索"
                size="middle"
                onSearch={this.onSearch.bind(this)}
            />
            </>
        )
    }
}

export default withRouter(SearchDom)