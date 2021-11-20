import {getInitialData, saveQuestionAnswer, _saveQuestion, _saveUser} from "../_DATA";
import {receiveUsers, updateUser} from './users';
import {setAuthedUser} from "./authedUser";
import {receiveQuestions, updateQuestion, appendQuestion} from "./questions";
import {AnswerOption, QuestionDefn} from "../types";
import {Dispatch} from "redux";

/**
 * load the users, questions (from the file db.ts) and the authedUser (from localStorage)
 */
export function handleInitialData(): any{
    return (dispatch: Dispatch) => {
        return getInitialData()
            .then( (response) => {
                dispatch(receiveUsers(response.users));
                dispatch(receiveQuestions(response.questions));
                dispatch(setAuthedUser(response.authedUser));
            })
    }
}

/**
 * submit an answer to a question
 * @param authedUser
 * @param qid
 * @param answer
 */
export function handleSubmission(authedUser:string, qid:string, answer:AnswerOption):any{
    return (dispatch: Dispatch) => {
        return saveQuestionAnswer({authedUser, qid, answer})
            .then(response=>{
                dispatch(updateUser(response.user));
                dispatch(updateQuestion(response.question));
            });
    };
}

/**
 * add a question
 * @param defn
 * @param callback - redirect the user after adding a question
 */
export function handleAddQuestion(defn:QuestionDefn, callback:()=>void): any{
    return (dispatch: Dispatch) => {
        return _saveQuestion(defn)
            .then(response=>{
                dispatch(appendQuestion(response.question));
                dispatch(updateUser(response.user));
                callback();
            });
    };
}

/**
 * save the authedUser to localStorage and then update the state
 * @param authedUser
 * @param callback
 */
export function handleAuthedUser(authedUser: string | null, callback?: ()=>void): any{
    return (dispatch: Dispatch) => {
        return _saveUser(authedUser)
            .then(()=>{
                dispatch(setAuthedUser(authedUser));
                if(callback){
                    callback();
                }
            });
    };
}

