import {RECEIVE_TWEETS} from "../actions/tweets";
import {TOGGLE_LIKE} from "../actions/tweets";

export default function tweets(state:any = {}, action:any){
    if(action.type === RECEIVE_TWEETS){
        return {
            ...state,
            ...action.tweets
        }
    }
    else if(action.type === TOGGLE_LIKE){
        const tweets = {
            ...state
        };
        const tweet = state[action.tweet.id];
        if(tweet.likes.includes(action.user)){
            tweet.likes = tweet.likes.filter( (s:string) => s !== action.user);
        }
        else{
            tweet.likes = [
                ...tweet.likes,
                action.user
            ];
        }
        tweets[action.tweet.id] = tweet;
        return tweets;
    }
    return state;
}
