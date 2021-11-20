export enum ActionTypes {
    SET_AUTHED_USER = 'SET_AUTHED_USER'
}

export type Action =
    {
        type: ActionTypes.SET_AUTHED_USER;
        id: string | null
    };

export function setAuthedUser(id: string | null): Action {
    return {
        type: ActionTypes.SET_AUTHED_USER,
        id
    }
}


