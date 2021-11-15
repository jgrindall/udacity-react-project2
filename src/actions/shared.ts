import { getInitialData } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receiveQuizUsers } from '../actions/quizUsers';
import { receiveTweets } from '../actions/tweets';
import {UserList} from "../types";

export function handleInitialData () {
  return (dispatch:any) => {
    return getInitialData()
      .then(({ users, tweets, quizUsers } : {users:any, tweets:any, quizUsers:UserList}) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuizUsers(quizUsers));
        dispatch(receiveTweets(tweets));
          dispatch(receiveQuizUsers(quizUsers));
      })
  }
}