import {handleUrl} from '../utils'
import {requestAllMusicList} from '../api/music'
export const REQUEST_MUSIC_LIST = 'REQUEST_MUSIC_LIST'
export const RECEIVE_MUSIC_LIST = 'RECEIVE_MUSIC_LIST'
export const SELECT_MUSIC_LIST = 'SELECT_MUSIC_LIST'
export const RECEIVE_ALL_MUSIC_LIST = 'RECEIVE_ALL_MUSIC_LIST'
export const CHANGE_RANK_PAGE = 'CHANGE_RANK_PAGE'

export function selectMusicList(musicTab) {
    return {
        type: SELECT_MUSIC_LIST,
        musicTab
    }
}

export function changePage(pageInfo) {
    return {
        type: CHANGE_RANK_PAGE,
        pageInfo
    }
}

export function requestMusicList(musicTab) {
    return {
        type: REQUEST_MUSIC_LIST,
        musicTab
    }
}

export function receiveMusicList(musicTab, json) {
    return {
        type: RECEIVE_MUSIC_LIST,
        musicTab,
        musicList: json.song_list
    }
}

export function receiveAllMusicList(resultQueue) {
    return {
        type: RECEIVE_ALL_MUSIC_LIST,
        resultQueue
    }
}

export function fetchAllMusicList() {
    return function (dispatch) {
        dispatch(requestMusicList())
        return Promise.all(requestAllMusicList())
            .then(resultQueue => {
                dispatch(receiveAllMusicList(resultQueue))
            })
    }
}


export function fetchMusicListByTab(options) {
    return function (dispatch) {
        dispatch(requestMusicList(options.tab))
        return fetch(handleUrl(options))
            .then(response => response.json())
            .then(json => dispatch(receiveMusicList(options.tab, json)))
    }
}





