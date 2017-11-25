import { TWEET_API } from '../actions'

function reducer(state, action) {
  switch (action.type) {
    case TWEET_API.REQUEST:
      return Object.assign({}, state, {
      })

    default:
      return state
  }
}

export default reducer

