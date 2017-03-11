import {combineReducers} from 'redux'
import {
    REQUEST_MUSIC_LIST, RECEIVE_MUSIC_LIST, SELECT_MUSIC_LIST,
    RECEIVE_ALL_MUSIC_LIST,CHANGE_RANK_PAGE
} from '../action/index'

// const selectedPlate = (state = '最热', action) => {
//     switch (action.type) {
//         case SELECT_MUSIC_LIST:
//             return action.musicTab
//         default:
//             return state
//     }
// }

// const musicList = (state = {
//     isFetching: false,
//     items: []
// }, action) => {
//     switch (action.type) {
//         case REQUEST_MUSIC_LIST:
//             return {
//                 ...state,
//                 isFetching: true,
//             }
//         case RECEIVE_MUSIC_LIST:
//             return {
//                 ...state,
//                 isFetching: false,
//                 items: action.musicList,
//             }
//         default:
//             return state
//     }
// }
//
// const musicListByTab = (state = {}, action) => {
//     switch (action.type) {
//         case RECEIVE_MUSIC_LIST:
//         case REQUEST_MUSIC_LIST:
//             return {
//                 ...state,
//                 [action.musicTab]: musicList(state[action.musicTab], action)
//             }
//         default:
//             return state
//     }
// }

function allMusicList(state = {}, action) {
    switch (action.type){
        case CHANGE_RANK_PAGE:
            console.log('changepage')
            console.log(state)
            return{
                ...state
            }
        case RECEIVE_ALL_MUSIC_LIST:
            let allMusicList = []
            action.resultQueue.forEach(val => {
                allMusicList.push({
                    type:val.billboard.name,
                    headPic:val.billboard.pic_s210,
                    songList:val.song_list,
                    currentPage:1
                })
            })
            return allMusicList
        default:
            return state
    }
}

const rootReducer = combineReducers({
    // musicListByTab,
    // selectedPlate,
    allMusicList
})

export default rootReducer