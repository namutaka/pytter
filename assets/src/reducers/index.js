import { TWEET_API } from '../actions'

function reducer(state, action) {
  switch (action.type) {
    case TWEET_API.REQUEST:
      return Object.assign({}, state, {
      })

    case TWEET_API.SUCCESS:
      return Object.assign({}, state, {
        tweets: action.json.tweets
      })

    case TWEET_API.FAILURE:
      return Object.assign({}, state, {
        tweets: []
      })

    default:
      return state
  }
}

export default reducer

