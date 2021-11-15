import {RECEIVE_QUIZ_USERS} from "../actions/quizUsers";

export default function users(state = [], action:any){
   if(action.type === RECEIVE_QUIZ_USERS){
        return {
            ...state,
            ...action.quizUsers
        }
    }
    return state;
}
