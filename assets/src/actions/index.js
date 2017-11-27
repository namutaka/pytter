import { createAction } from 'redux-actions'
import { Urls } from '../utils'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const GET_TWEETS = 'GET_TWEETS'
const POST_TWEET = 'POST_TWEET'

export const getTweets = createAction(
  GET_TWEETS,
  async (since) => {
    var res = await fetch(
      Urls['tweet_api:tweets']() + '?since=' + since,
      {
        mode: 'cors',
        credentials: 'include'
      }
    )
    var json = await res.json()
    return json;
  }
)

export const postTweet = createAction(
  POST_TWEET,
  async text => {
    var formData = new FormData()
    formData.append('text', text)

    // Perform the fetching:
    var res = await fetch(
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
    )
    var json = res.json()
    return json
  }
)

