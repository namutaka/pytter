import { ApiType } from '../middlewares/callApiMiddleware'
import { Urls } from '../utils'

export const TWEET_API = new ApiType('TWEET_API')

function loadTweet() {
  return {
    // Types of actions to emit before and after
    types: TWEET_API,

    // Check the cache (optional):
    shouldCallAPI: state => true,

    // Perform the fetching:
    callAPI: () => fetch(`http://myapi.com/users/${userId}/posts`),

    // Arguments to inject in begin/end actions
    payload: { userId }
  }
}

export { loadTweet }
