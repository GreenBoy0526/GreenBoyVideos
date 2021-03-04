import { Component } from "react";
import { Menu, Affix,Input } from 'antd';
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import http from "../utils/request";
import {withRouter} from 'react-router-dom'

const { SubMenu } = Menu;
const { Search } = Input
class NavMenu extends Component {
 
    state = {
        current: 'mail',

        searchResult:[]
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
        if (e.key=='home') {
            this.props.history.push(`/`)
        }
    };
    onSearch = value => {
        // console.log(value)
        this.props.history.push(`/GreenBoyVideos/s?wd=${value}`)
    }
    
    render() {
        const { current } = this.state;
        return (
            <Affix offsetTop={0}>
                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        首页
             </Menu.Item>
                    <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
                        Navigation Two
            </Menu.Item>
                    <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
                        <Menu.ItemGroup title="Item 1">
                            <Menu.Item key="setting:1">Option 1</Menu.Item>
                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Item 2">
                            <Menu.Item key="setting:3">Option 3</Menu.Item>
                            <Menu.Item key="setting:4">Option 4</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <Menu.Item key="alipay">
                        111
                    </Menu.Item>
                    <Menu.Item>
                        <Search placeholder="请输入影片或演员名" style={{marginTop:8}} onSearch={this.onSearch} />
                    </Menu.Item>
                </Menu>
            </Affix>
        )
    }
}

export default withRouter(NavMenu);