import {Action, ActionTypes} from "../actions/questions";
import {QuestionList} from "../types";

export default function questions(state:QuestionList = {}, action:Action){
    if(action.type === ActionTypes.RECEIVE_QUESTIONS){
        return {
            ...state,
            ...action.questions
        }
    }
    else if(action.type === ActionTypes.UPDATE_QUESTION){
        // overwrite
        return {
            ...state,
            [action.question.id] : action.question
        };
    }
    else if(action.type === ActionTypes.APPEND_QUESTION){
        //append
        return {
            ...state,
            [action.question.id] : action.question
        };
    }
    return state;
}
