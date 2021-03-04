import React, { Component } from 'react'
import { Tag, Card } from 'antd';
import http from '../utils/request'
import { withRouter } from 'react-router-dom'

class VodCard extends Component {
    componentDidMount() {
        let id = this.props.data.vod_id
        http.get(`api.php/provide/vod/at/json/?ac=detail&ids=${id}`).then(res => {
            res.list[0].vod_actor = res.list[0].vod_actor.split(",").slice(0, 4).join(",")
            this.setState({
                detail: res.list[0]
            })
            // console.log(this.state.detail)
        })
    }
    state = {
        detail: {}
    }
    todetail = (id) => {
        this.props.history.push(`/GreenBoyVideos/d?id=${id}`)
    }
    render() {
        let { vod_name, type_name, vod_remarks, vod_time, vod_id } = this.props.data
        let { vod_director, vod_actor, vod_area, vod_pic } = this.state.detail
        // vod_actor=vod_actor.split(",")
        return (
            <Card hoverable style={{ width: 600, margin: 10 }} onClick={() => { this.todetail(vod_id) }}>
                <div style={{ height: 200, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <div style={{ width: 200, height: 200 }}>
                        <img src={vod_pic} alt="" height="200" />
                    </div>
                    <div>
                        <p>{vod_name} <Tag>{vod_remarks}</Tag></p>
                        <p>导演：{vod_director || "不详"}</p>
                        <p>主演：{vod_actor || "不详"}</p>
                        <p>类型：{type_name} 地区：{vod_area}</p>
                        <p>更新时间：{vod_time}</p>
                    </div>
                </div>
            </Card>

        )
    }
}
export default withRouter(VodCard)