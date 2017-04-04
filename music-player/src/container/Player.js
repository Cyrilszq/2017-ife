import React, {Component} from 'react';
import {fetchMusicDetail} from '../action/index'
import {connect} from 'react-redux'
import './player.css'

class Player extends Component {


    constructor(props) {
        super(props)
        let playList = []
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            playList.push({
                id: key,
                ...JSON.parse(localStorage.getItem(key)),
                isChecked: false
            })
        }
        this.state = {
            playList,
            play:playList
        }
    }

    componentDidMount() {
        const {dispatch} = this.props
        // console.log(this.state)
        // dispatch(fetchMusicDetail(this.props.params.id))
    }

    handleChange(index) {
        this.setState((prevState, props) => {
            prevState.playList[index].isChecked = !prevState.playList[index].isChecked
            return {playList: prevState.playList};
        })
    }

    selectAll() {
        let count = 1
        this.setState((prevState, props) => {
            return {
                playList: prevState.playList.map(t => {
                    return {
                        ...t,
                        isChecked: true
                    }
                })
            }
        })
        count++
    }

    deletetAll() {

    }

    render() {
        const {musicDetail} = this.props

        return (
            <div className="bg">
                <h2>我的音乐</h2>
                <div className="my-song-list">
                    <button onClick={this.selectAll.bind(this)}>全选</button>
                    <button onClick={this.deletetAll.bind(this)}>删除</button>
                    <ul>
                        {this.state.playList.map((song, index) => {
                            return (
                                <li key={song.id} className="song-list-item">
                                    <input type="checkbox" checked={song.isChecked}
                                           onChange={this.handleChange.bind(this, index)}/>
                                    <span>{song.title}</span>
                                    <span>{song.author}</span>
                                    <span>x</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <audio src={this.state.play}></audio>
                <div className="">

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {musicDetail} = state
    return {
        musicDetail
    }
}

export default connect(
    mapStateToProps
)(Player)