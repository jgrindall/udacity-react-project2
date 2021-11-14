export const SET_AUTHED_USER:string = 'SET_AUTHED_USER'

type AuthAction = {
  type:string,
  id:string
};

export function setAuthedUser (id:string) : AuthAction {
  return {
    type: SET_AUTHED_USER,
    id
  }
}