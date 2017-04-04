import React, {Component} from 'react';
import {Link} from 'react-router'
import './style.css'
import add from '../static/add.svg'
import download from '../static/download.svg'
import play from '../static/play.svg'
import previous from '../static/previous.svg'
import next from '../static/next.svg'

function addToLocal({song_id, title, author}) {
    let json = {
        "title": title,
        "author": author
    }
    localStorage.setItem(song_id, JSON.stringify(json))
}


const MusicList = ({list, headPic, onPageChangeNextClicked, onPageChangePreClicked}) => {
    return (
        <div className="rank-panel">
            <img src={headPic} width={300}/>
            <ul>
                {list.map((song, index) => {
                    return (
                        <li className="rank-item" key={index}>
                            <Link to={`/player/${song.song_id}`}>
                                <span>{song.title}</span>
                            </Link>
                            <div className="icon-wrap">
                                <Link to={`/player/${song.song_id}`}>
                                    <img
                                        className="icon"
                                        src={play}
                                        width={24}></img>
                                </Link>
                                <img
                                    className="icon"
                                    src={add}
                                    width={26}
                                    onClick={addToLocal.bind(null, song)}></img>
                                <img
                                    className="icon"
                                    src={download}
                                    width={24}></img>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div>
                <img src={next} className="page-control" onClick={onPageChangeNextClicked}/>
                <img src={previous} className="page-control" onClick={onPageChangePreClicked}/>
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