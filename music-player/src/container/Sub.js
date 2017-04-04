import React, {Component} from 'react';

export default class Sub extends Component{



  render(){
    console.log(this.context)
    return(

      <div>

      </div>
    )
  }
}

Sub.contextTypes = {
  color:React.PropTypes.string
}