export const SET_AUTHED_USER:string = 'SET_AUTHED_USER';

type AuthAction = {
  type:string,
  id:string | null
};

export function setAuthedUser (id:string | null) : AuthAction {
  return {
    type: SET_AUTHED_USER,
    id
  }
}


