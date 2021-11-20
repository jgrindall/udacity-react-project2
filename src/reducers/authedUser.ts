import {ActionTypes} from "../actions/authedUser";

export default function authedUser(state:any = null, action:any){
    if(action.type === ActionTypes.SET_AUTHED_USER){
        return action.id;
    }
    return state;
}
