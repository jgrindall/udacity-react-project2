import {SET_AUTHED_USER} from "../actions/authedUser";

export default function authedUser(state:any = null, action:any){
    if(action.type === SET_AUTHED_USER){
        return action.id;
    }
    return state;
}
