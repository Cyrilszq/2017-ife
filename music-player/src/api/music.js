const baseUrl = '/api/ting/?format=json&calback=&from=webapp_music&method='


// type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
const types = [1, 2, 25]
/**
 * 构造请求所有排行榜的任务队列,返回一个数组，每个值为请求获得的promise对象
 * @returns {Array}
 */
export function requestAllMusicList() {
    let requestQueue = []
    types.forEach(type => {
        let request = fetch(`${baseUrl}baidu.ting.billboard.billList&type=${type}&size=10&offset=0`)
            .then(response => response.json())
        requestQueue.push(request)
    })
    return requestQueue
}