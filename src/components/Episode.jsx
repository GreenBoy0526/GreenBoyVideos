import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Space, Button, Card } from 'antd';

class Episode extends Component {
    componentDidMount(data){
        if (!this.props.source) {
            this.setState({
                key:this.props.urls[0].name
            })
        }else{
            this.setState({
                key:this.props.source
            })
        }
    }
    componentDidUpdate(data){
        console.log(data);
        let {index}=this.props
        if (data.history.location.search != data.location.search) {
            console.log(index)
            this.setState({
                index:data.index,
                key:data.source
            })
        }
    }
    state = {
        key:'',
    }
    onTabChange = (key, type) => {
        // console.log(key, type);
        this.setState({ [type]: key });
    }
    render() {
        const tabList = [];
        const contentList = {};
        for (let i = 0; i < this.props.urls.length; i++) {
            tabList[i]={
                key:this.props.urls[i].name,
                tab:`播放${i+1}`
            }
            contentList[tabList[i].key]=this.props.urls[i].urls
        }
        // console.log(tabList,contentList,this.state.key);
        return (
            <Card
                style={{ width: '100%' }}
                tabList={tabList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
            >
                <Space wrap>
                    {
                        this.state.key?contentList[this.state.key].map((item,index)=><Button key={item.name} onClick={()=>{this.props.onChooseEpisode(this.state.key,index)}}>{item.name}</Button>):'无数据'
                    }
                </Space>
            </Card>
        )
    }
}
// export default Episode
export default withRouter(Episode)