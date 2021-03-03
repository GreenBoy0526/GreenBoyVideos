import { Component } from 'react';
import http from '../utils/request'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'
import { Tag, Space, Button, Card, Breadcrumb } from 'antd';
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import Episode from "../components/Episode";
import VideoPlayer from "../components/VideoPlayer";


class Play extends Component {
    componentDidMount() {
        let { id, source, index } = qs.parse(this.props.location.search.slice(1))
        http.get(`api.php/provide/vod/at/json/?ac=detail&ids=${id}`).then(res => {
            let namelist = res.list[0].vod_play_from.split('$$$')
            let play_url_list = res.list[0].vod_play_url.split('$$$')
            let urls = []
            for (let i = 0; i < namelist.length; i++) {
                urls[i] = {
                    name: namelist[i],
                    urls: play_url_list[i].split('#')
                }
                for (let j = 0; j < urls[i].urls.length; j++) {
                    urls[i].urls[j] = {
                        name: urls[i].urls[j].split('$')[0],
                        url: urls[i].urls[j].split('$')[1]
                    }
                }
            }
            console.log(urls);

            this.setState({
                detail: res.list[0],
                urls,
                id
            })
        })
    }
    toVod = (source, index) => {
        this.props.history.push(`/v?id=${this.state.id}&source=${source}&index=${index}`)
    }
    state = {
        detail: {},
        urls: []
    }
    render() {
        let { vod_name, type_name, vod_remarks, vod_time, vod_director, vod_actor, vod_area, vod_pic, vod_blurb } = this.state.detail
        let { source, index } = qs.parse(this.props.location.search.slice(1))
        let url = this.state.urls.find(function (element) {
            return element.name == source;
        })
        console.log(url);

        return (
            <div style={{ margin: '2rem auto', width: '80%' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">搜索：{vod_name}</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">{vod_name}</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>第{+index+1}集</Breadcrumb.Item>
                </Breadcrumb>
                {
                    source == 'ckm3u8' && url ?
                        <div style={{ margin: '0 auto', width: 1000 }}>
                            <VideoPlayer src={url ? url.urls[index].url : ''} width="1000" />
                        </div> :
                        <div style={{ margin: '0 auto', width: 1000 }}>
                            <iframe src={url ? url.urls[index].url : ''} frameBorder="0" width="1000" height="700" allowFullScreen="true"></iframe>
                        </div>
                }


                {
                    this.state.urls.length > 0 ?
                        <Episode urls={this.state.urls} onChooseEpisode={this.toVod} source={source} index={index}></Episode> :
                        <p></p>
                }

            </div>
        )
    }
}

export default withRouter(Play);