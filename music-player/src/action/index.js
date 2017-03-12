import {requestAllMusicList, requestNextPage, requestPrePage, requestMusicDetail} from '../api/music'
export const REQUEST_MUSIC_LIST = 'REQUEST_MUSIC_LIST'
export const RECEIVE_MUSIC_DETAIL = 'RECEIVE_MUSIC_DETAIL'
export const RECEIVE_ALL_MUSIC_LIST = 'RECEIVE_ALL_MUSIC_LIST'
export const CHANGE_TO_NEXT_PAGE = 'CHANGE_TO_NEXT_PAGE'
export const CHANGE_TO_PRE_PAGE = 'CHANGE_TO_PRE_PAGE'

export function receiveNextPage(typeName, data) {
    return {
        type: CHANGE_TO_NEXT_PAGE,
        data,
        typeName
    }
}

export function receivePrePage(typeName, data) {
    return {
        type: CHANGE_TO_PRE_PAGE,
        data,
        typeName
    }
}

export function fetchNextPage(index) {
    return function (dispatch, getState) {
        let temp = getState().allMusicList[index]
        // dispatch(requestMusicList(options.tab))
        return requestNextPage(index, temp.currentPage)
            .then(data => {
                dispatch(receiveNextPage(temp.type, data.song_list))
            })

    }
}

export function fetchPrePage(index) {
    return function (dispatch, getState) {
        let temp = getState().allMusicList[index]
        if (temp.currentPage <= 1) {
            return
        }
        // dispatch(requestMusicList(options.tab))
        return requestPrePage(index, temp.currentPage)
            .then(data => {
                dispatch(receivePrePage(temp.type, data.song_list))
            })
    }
}


export function requestMusicList(musicTab) {
    return {
        type: REQUEST_MUSIC_LIST,
        musicTab
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

export function receiveMusicDetail(musicDetail) {
    return {
        type: RECEIVE_MUSIC_DETAIL,
        musicDetail
    }
}

export function fetchMusicDetail(id) {
    return function (dispatch) {
        return requestMusicDetail(id)
            .then(data => {
                dispatch(receiveMusicDetail(data))
            })
    }
}







