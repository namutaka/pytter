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

    this.timer = setInterval(() => this.getTweets(), 1000)

    this.handlePost = this.handlePost.bind(this)
    this.getTweets = this.getTweets.bind(this)
  }

  componentWillMount() {
  }

  getTweets() {
    const { timeline } = this.props
    this.props.getTweets(timeline.updated_at)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handlePost(text) {
    this.props.postTweet(text)
  }

  render() {
    const { timeline } = this.props
    return (
      <div className="App">
        <TweetPostForm onPost={this.handlePost}/>
        <br/>
        <TweetList tweets={timeline.tweets} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  timeline: state.timeline
})

export default connect(mapStateToProps, {
  getTweets, postTweet
})(App)


