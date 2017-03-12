import React, {Component} from 'react';
import {fetchMusicDetail} from '../action/index'
import {connect} from 'react-redux'
class Player extends Component {
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchMusicDetail(this.props.params.id))
    }

    render() {
        const {musicDetail} = this.props
        return (
            <div>
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