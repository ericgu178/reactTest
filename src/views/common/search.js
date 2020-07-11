import { Input } from "antd";
import React from "react";
const {Search} = Input;
// 搜索框

class SearchDom extends React.Component {
    // 搜索事件
    onSearch (value) {
        console.log(value)
    }
    render () {
        return (
            <>
            <Search
                placeholder="输入关键字搜索"
                enterButton="搜索"
                size="middle"
                onSearch={this.onSearch}
            />
            </>
        )
    }
}

export default SearchDom