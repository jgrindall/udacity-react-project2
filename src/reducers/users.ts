import {RECEIVE_USERS} from "../actions/users";

export default function users(state = [], action:any){
    if(action.type === RECEIVE_USERS){
        return {
            ...state,
            ...action.users
        }
    }
    return state;
}
