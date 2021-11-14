import React, { Component } from 'react'
import {connect} from "react-redux";
import {toggleLike} from "../actions/tweets";

function formatTweet (tweet, author, authedUser, parentTweet) {
    const { id, likes, replies, text, timestamp } = tweet
    const { name, avatarURL } = author

    return {
        name,
        id,
        timestamp,
        text,
        avatar: avatarURL,
        likes: likes,
        replies: replies,
        hasLiked: likes.includes(authedUser),
        parent: !parentTweet ? null : {
            author: parentTweet.author,
            id: parentTweet.id,
        }
    }
}

class Tweet extends Component {
    gotoParent(){
        alert("goto parent");
    }

    toggleLike(){
        this.props.dispatch(toggleLike(this.props.tweet, this.props.authedUser));
    }

  render() {
      const tweet = this.props.tweet;
    const like = <div>
        <button>{tweet.likes.length ? tweet.likes.length + ' likes' : 'no likes yet'}</button>
        <br/>
        <button onClick={this.toggleLike.bind(this)}>{tweet.hasLiked ? 'liked' : 'like'}</button>
    </div>;
    const reply = <button>{tweet.replies.length ? tweet.replies.length + ' replies' : 'no replies yet'}</button>;
    return (
        <li>{tweet.id}
            <p>{tweet.text}</p>
            <p>{tweet.avatar}</p>
            <p onClick={this.gotoParent.bind(this)}>{tweet.parent ? tweet.parent.id : "<none>"}</p>
            {reply}
            {like}
        </li>

    )
  }
}

function mapStateToProps(state, props){
    const tweet = state.tweets[props.id];
    const parentTweet = tweet.replyingTo ? state.tweets[tweet.replyingTo] : null;
  return {
      id:props.id,
      authedUser:state.authedUser,
      parent:tweet.replyingTo ? state.tweets[tweet.replyingTo] : null,
      tweet:formatTweet(tweet, state.users[tweet.author], state.authedUser, parentTweet)
  }
}

export default connect(mapStateToProps)(Tweet);