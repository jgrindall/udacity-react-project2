import {QuestionList, UserList} from "../types";

export const RECEIVE_QUIZ_USERS = 'RECEIVE_QUIZ_USERS';

export type QAction = {
    type: string,
    quizUsers: UserList
};

export function receiveQuizUsers(quizUsers: UserList) {
    return {
        type: RECEIVE_QUIZ_USERS,
        quizUsers
    }
}