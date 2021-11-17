import {saveLikeToggle} from "../utils/api";
import {UserList} from "../types";

export const RECEIVE_TWEETS: string = 'RECEIVE_TWEETS';
export const TOGGLE_LIKE: string = 'TOGGLE_LIKE';

export type QAction = {
    type: string,
    quizUsers: UserList
};

/*export function receiveTweets(tweets: any) {
    return {
        type: RECEIVE_TWEETS,
        tweets,
    }
}

function toggleTweet(tweet: any, user: any) {
    return {
        type: TOGGLE_LIKE,
        tweet,
        user
    }
}*/

export function toggleLike(tweet: any, userId: string) {
    return (dispatch: any) => {
        const hasLiked = tweet.likes.includes(userId);
        const newHasLiked = !hasLiked;
        return saveLikeToggle({
            id: tweet.id,
            hasLiked: newHasLiked,
            authedUser: userId
        })
            .then(() => {
                //dispatch(toggleTweet(tweet, userId))
            });
    }
}