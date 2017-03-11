import React, {Component} from 'react';
class Player extends Component {


    // album_id: "533650362"
    // album_no: "0"
    // album_title: "上瘾"
    // all_artist_id: "273812272"
    // all_rate: "64,128,256,320,flac"
    // artist_id: "273812272"
    // author: "光泽"
    // charge: 0
    // collect_num: 287
    // comment_num: 4
    // copy_type: "1"
    // del_status: "0"
    // has_mv: 0
    // has_mv_mobile: 0
    // havehigh: 2
    // is_first_publish: 0
    // korean_bb_song: "0"
    // learn: 0
    // lrclink: "http://musicdata.baidu.com/data2/lrc/d2325e9e0c984698030b539e385dff1f/533655205/533655205.lrc"
    // mv_provider: "0000000000"
    // piao_id: "0"
    // pic_big: "http://musicdata.baidu.com/data2/pic/4325e1c8e8eeb060017c2e08287e0f79/533645190/533645190.png@s_0,w_150"
    // pic_huge: "http://musicdata.baidu.com/data2/pic/4325e1c8e8eeb060017c2e08287e0f79/533645190/533645190.png"
    // pic_premium: "http://musicdata.baidu.com/data2/pic/4325e1c8e8eeb060017c2e08287e0f79/533645190/533645190.png@s_0,w_500"
    // pic_radio: "http://musicdata.baidu.com/data2/pic/4325e1c8e8eeb060017c2e08287e0f79/533645190/533645190.png@s_0,w_300"
    // pic_small: "http://musicdata.baidu.com/data2/pic/4325e1c8e8eeb060017c2e08287e0f79/533645190/533645190.png@s_0,w_90"
    // play_type: ""
    // publishtime: "2017-02-28"
    // relate_status: "0"
    // resource_type: "0"
    // resource_type_ext: "0"
    // share_num: 8
    // si_presale_flag: "0"
    // song_id: "533656736"
    // song_source: "web"
    // special_type: 0
    // ting_uid: "239571978"
    // title: "上瘾 (纯钢琴版)"
    // toneid: "0"

    componentDidMount() {
        let self = this
        fetch(`/api/ting/?format=json&calback=&from=webapp_music&method=baidu.ting.song.play&songid=${this.props.params.id}`)
            .then(response => {
                let contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json()
                        .then(json => {
                            // this.setState({
                            //     songlist: json.song_list
                            // })
                            console.log(json)
                        });
                } else {
                    console.log("we can't got JSON!");
                }
            })

    }

    render() {
        return (
            <div>
            </div>
        )
    }
}
export default Player