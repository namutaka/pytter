import { handleActions, combineActions } from 'redux-actions'
import { getTweets, postTweet } from '../actions'

const defaultState = []

const reducer = handleActions({
  [getTweets](state, { payload: { tweets } }) {
    return tweets;
  }
}, defaultState);

export default reducer

