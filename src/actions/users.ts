import {UserList} from "../types";

export const RECEIVE_USERS = 'RECEIVE_USERS';

export type QAction = {
    type: string,
    users: UserList
};

export function receiveUsers(users: UserList) {
    return {
        type: RECEIVE_USERS,
        users
    }
}
