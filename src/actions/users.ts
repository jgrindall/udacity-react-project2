import {User, UserList} from "../types";

export enum ActionTypes {
    RECEIVE_QUIZ_USERS = 'RECEIVE_QUIZ_USERS',
    UPDATE_USER = 'UPDATE_USER'
}

export type Action =
    {
        type: ActionTypes.RECEIVE_QUIZ_USERS;
        users: UserList
    }
    |
    {
        type: ActionTypes.UPDATE_USER;
        user: User
    };

export function receiveUsers(users: UserList): Action {
    return {
        type: ActionTypes.RECEIVE_QUIZ_USERS,
        users
    }
}

export function updateUser(user:User) : Action {
    return {
        type: ActionTypes.UPDATE_USER,
        user
    }
}
