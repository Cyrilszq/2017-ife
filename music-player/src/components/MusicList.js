import React, {Component} from 'react';
import {Link} from 'react-router'
import './style.css'
// const tabs = ['新歌榜','热歌榜','原创榜']

const MusicList = ({type, list, headPic,onPageChangeClicked}) => {
    return (
        <div className="rank-panel">
            <img src={headPic}/>
            <ul>
                {list.map((song,index) => {
                    return (
                    <Link to={`/player/${song.song_id}`} key={index}>
                        <li  className="rank-item">
                            {song.title}
                        </li>
                    </Link>
                    )
                })}
            </ul>
            <div>
                <span className="page-control" onClick={onPageChangeClicked}>下一页</span>
                <span className="page-control" onClick={onPageChangeClicked}>上一页</span>
            </div>
        </div>
    )
}

// album_id: "533571170"
// album_no: "1"
// album_title: "我管你"
// all_artist_id: "64279851"
// all_artist_ting_uid: "92456597"
// all_rate: "64,128,256,320,flac"
// area: "0"
// artist_id: "64279851"
// artist_name: "华晨宇"
// author: "华晨宇"
// charge: 0
// copy_type: "1"
// country: "内地"
// del_status: "0"
// file_duration: 267
// has_mv: 0
// has_mv_mobile: 0
// havehigh: 2
// hot: "338829"
// is_first_publish: 0
// is_new: "1"
// korean_bb_song: "0"
// language: "国语"
// learn: 0
// lrclink: "http://musicdata.baidu.com/data2/lrc/6f227a838cc1af002c49ac703afd4e1f/533576589/533576589.lrc"
// mv_provider: "0000000000"
// piao_id: "0"
// pic_big: "http://musicdata.baidu.com/data2/pic/caa844912cdb0548dd243e276216856f/533571144/533571144.jpg@s_0,w_150"
// pic_small: "http://musicdata.baidu.com/data2/pic/caa844912cdb0548dd243e276216856f/533571144/533571144.jpg@s_0,w_90"
// publishtime: "2017-02-21"
// rank: "1"
// rank_change: "0"
// relate_status: "0"
// resource_type: "0"
// resource_type_ext: "0"
// song_id: "533571441"
// song_source: "web"
// style: ""
// ting_uid: "92456597"
// title: "我管你"
// toneid: "0"
// versions: ""


export default MusicList