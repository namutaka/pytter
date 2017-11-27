import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTweets, postTweet } from '../actions'
import TweetList from '../components/TweetList'
import TweetPostForm from '../components/TweetPostForm'

class App extends Component {
  constructor() {
    super()
    this.state = {
    }

    this.timer = setInterval(() => this.props.getTweets(), 1000)

    this.handlePost = this.handlePost.bind(this)
  }

  componentWillMount() {
    this.props.getTweets()
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handlePost(text) {
    this.props.postTweet(text)
  }

  render() {
    const { tweets } = this.props
    return (
      <div className="App">
        <TweetPostForm onPost={this.handlePost}/>
        <br/>
        <TweetList tweets={tweets} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  tweets: state.tweets
})

export default connect(mapStateToProps, {
  getTweets, postTweet
})(App)


