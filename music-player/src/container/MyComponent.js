import React, {Component} from 'react';
import Sub from './Sub'
export default class MyComponent extends Component {


  render() {
    console.log(this.context)
    return (
      <div>

      </div>
    )
  }
}

MyComponent.contextTypes = {
  store: React.PropTypes.object
  // storeSubscription: subscriptionShape
}