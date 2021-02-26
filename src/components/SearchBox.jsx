import React, { Component } from 'react';

import { Input, Space } from 'antd';
const { Search } = Input

class SearchBox extends Component {

    onSearch = value => console.log(value)
    render() {
        return (
            <Search placeholder="请输入影片或演员名" onSearch={this.onSearch} />
            // <Space direction="vertical">
            //         <Search placeholder="请输入影片或演员名" onSearch={this.onSearch} />
            // </Space>
        )
    }
}

export default SearchBox;