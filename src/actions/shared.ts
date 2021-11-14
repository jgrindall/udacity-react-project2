import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveTweets } from '../actions/tweets'
import { setAuthedUser } from '../actions/authedUser'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
  return (dispatch:any) => {
    return getInitialData()
      .then(({ users:any, tweets:any }) => {
        dispatch(receiveUsers(users:any));
        dispatch(receiveTweets(tweets:any));
        dispatch(setAuthedUser(AUTHED_ID));
      })
  }
}