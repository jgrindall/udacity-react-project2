import {
    _saveLikeToggle,
    _saveTweet,
} from './_DATA'

import {_getQuestions, _getQuizUsers} from "../_DATA";

import {QuestionList, UserList} from "../types";

export async function getInitialData(): Promise<{quizUsers: UserList, questions: QuestionList }> {
    //const users = await _getUsers();
    const quizUsers: UserList = await _getQuizUsers();
    //const tweets: any = await _getTweets();
    const questions = await _getQuestions();
    debugger;
    return {
        quizUsers,
        //tweets,
        questions
    };
}

export function saveLikeToggle (info:any) {
    return _saveLikeToggle(info)
}

export function saveTweet (info:any) {
    return _saveTweet(info)
}