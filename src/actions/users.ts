export const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveUsers (users:any) {
  return {
    type: RECEIVE_USERS,
    users
  }
}