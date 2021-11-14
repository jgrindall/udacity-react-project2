import React, { Component } from 'react'
import {connect} from "react-redux";
import Tweet from "./Tweet";
class Dashboard extends Component {
  componentDidMount() {

  }

  render() {
    const ids = this.props.tweetIds.map(id=>{
      return (
          <Tweet key={id} id={id}></Tweet>
      );
    });
    return (
        <div>
          <span>ids:</span>
          <ul>
            {ids}
          </ul>
        </div>
    )
  }
}

function mapStateToProps(state){
  return {
    tweetIds:Object.keys(state.tweets)
  }
}

export default connect(mapStateToProps)(Dashboard);