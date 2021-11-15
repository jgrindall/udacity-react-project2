import {
    _getTweets,
    _getUsers,
    _saveLikeToggle,
    _saveTweet,
} from './_DATA'

import {_getQuizUsers} from "../_DATA";
import {UserList} from "../types";

export async function getInitialData() {
    const users = await _getUsers();
    const quizUsers: UserList = await _getQuizUsers();
    const tweets: any = await _getTweets();
    debugger;
    return {
        users,
        quizUsers,
        tweets
    };
}

export function saveLikeToggle (info:any) {
    return _saveLikeToggle(info)
}

export function saveTweet (info:any) {
    return _saveTweet(info)
}