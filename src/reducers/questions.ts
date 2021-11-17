import {RECEIVE_QUESTIONS} from "../actions/questions";
import {QuestionList} from "../types";


export default function questions(state:any = {}, action:{type:string, questions: QuestionList}){
    if(action.type === RECEIVE_QUESTIONS){
        return {
            ...state,
            ...action.questions
        }
    }
    return state;
}
