import { handleActions, combineActions } from 'redux-actions'
import { getTweets, postTweet } from '../actions'

const defaultState = []

const reducer = handleActions({
  [getTweets](state, action) {
    var { payload: { tweets } } = action
    if (action.error) { return state }
    var newTweets = tweets.concat(state.tweets);
    return {
      tweets: newTweets,
      updated_at: new Date().toISOString()
    }
  }
}, defaultState);

export default reducer

