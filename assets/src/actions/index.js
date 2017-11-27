import { ApiType } from '../middlewares/callApiMiddleware'
import { Urls } from '../utils'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const TWEET_API = new ApiType('TWEET_API')
export const TWEET_POST_API = new ApiType('TWEET_POST_API')

function loadTweet() {
  return {
    // Types of actions to emit before and after
    type: TWEET_API,

    // Check the cache (optional):
    shouldCallAPI: state => true,

    // Perform the fetching:
    callAPI: () => fetch(
      Urls['tweet_api:tweets'](),
      {
        mode: 'cors',
        credentials: 'include'
      }
    ),

    // Arguments to inject in begin/end actions
    payload: { }
  }
}

function postTweet(text) {
  var formData = new FormData()
  formData.append('text', text)

  return {
    // Types of actions to emit before and after
    type: TWEET_POST_API,

    // Check the cache (optional):
    shouldCallAPI: state => true,

    // Perform the fetching:
    callAPI: () => fetch(
      Urls['tweet_api:post_tweet'](),
      {
        mode: 'cors',
        credentials: 'include',
        method: 'post',
        headers: {
          'X-CSRFToken': cookies.get('csrftoken')
        },
        body: formData
      }
    ),

    // Arguments to inject in begin/end actions
    payload: { }
  }
}

export {
  loadTweet,
  postTweet
}
