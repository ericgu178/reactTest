import { Input } from "antd";
import React from "react";
import {withRouter} from 'react-router-dom'
const {Search} = Input;
// 搜索框

class SearchDom extends React.Component {
    // 搜索事件
    onSearch (value) {
        window.location.href = '/search/' + value
    }

    render () {
        return (
            <>
                <Search
                    placeholder="输入关键字搜索"
                    enterButton="搜索"
                    size="middle"
                    style={{
                        background:'#001529',
                        border:'0',
                        outline: 'none',
                        color: '#fff'
                    }}
                    onPressEnter={this.onSearch.bind(this)}
                    onSearch={this.onSearch.bind(this)}
                />
            </>
        )
    }
}

export default withRouter(SearchDom)