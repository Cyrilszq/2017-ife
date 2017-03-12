import React, {Component} from 'react';
import {connect} from 'react-redux'
import './style.css'
import MusicList from '../components/MusicList'
import {fetchAllMusicList, fetchNextPage,fetchPrePage} from '../action/index'

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch} = this.props
        // dispatch(fetchMusicList({
        //     tab: selectedPlate,
        //     size:10,
        //     offset:0
        // }))
        dispatch(fetchAllMusicList())
    }

    handlePrePage(index) {
        this.props.dispatch(fetchPrePage(index))
    }

    handleNextPage(index) {
        this.props.dispatch(fetchNextPage(index))
    }

    render() {
        const {allMusicList, dispatch} = this.props
        let view
        if (allMusicList.length) {
            view = allMusicList.map((musicList, index) => {
                return (
                    <MusicList
                        type={musicList.type}
                        list={musicList.songList}
                        key={index}
                        headPic={musicList.headPic}
                        onPageChangeNextClicked={this.handleNextPage.bind(this, index)}
                        onPageChangePreClicked={this.handlePrePage.bind(this,index)}/>
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
