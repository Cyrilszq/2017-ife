import React, {Component} from 'react';
import {connect} from 'react-redux'
import './style.css'
import MusicList from '../components/MusicList'
import {fetchMusicList, fetchAllMusicList,changePage} from '../action/index'

class App extends Component {
    constructor(props){
        super(props)
        this.handlePageChange = this.handlePageChange.bind(this)
    }
    componentDidMount() {
        const {dispatch, selectedPlate} = this.props
        // dispatch(fetchMusicList({
        //     tab: selectedPlate,
        //     size:10,
        //     offset:0
        // }))
        dispatch(fetchAllMusicList())
    }
    handlePageChange(){
        this.props.dispatch(changePage())
    }
    render() {
        const {allMusicList,dispatch} = this.props
        let view
        if (allMusicList.length) {
            view = allMusicList.map((musicList, index) => {
                return (
                    <MusicList
                        type={musicList.type}
                        list={musicList.songList}
                        key={index}
                        headPic={musicList.headPic}
                        onPageChangeClicked={this.handlePageChange}/>
                )
            })
        }
        return (
            <div>
                <h2>音乐排行榜</h2>
                <div className="rank-panel-contianer">
                    {view}
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const {allMusicList} = state
    return {
        allMusicList
    }
}

export default connect(
    mapStateToProps
)(App)
