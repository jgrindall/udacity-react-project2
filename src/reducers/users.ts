import {ActionTypes, Action} from "../actions/users";
import {UserList} from "../types";

export default function users(state: UserList = {}, action:Action){
   if(action.type === ActionTypes.RECEIVE_QUIZ_USERS){
        return {
            ...state,
            ...action.users
        }
    }
   else if(action.type === ActionTypes.UPDATE_USER){
       return {
           ...state,
           [action.user.id]: action.user
       }
   }
   return state;
}

