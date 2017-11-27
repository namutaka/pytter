import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TweetItem from './TweetItem'

class TweetList extends Component {
  static propTypes = {
    tweets: PropTypes.array
  }

  render() {
    const { tweets } = this.props
    return (
      <Paper>
        <List>
        {tweets.map((tweet, i) =>
          <div key={i}>
            <TweetItem
              tweet={tweet}
            />
            <Divider />
          </div>
        )}
        </List>
      </Paper>
    );
  }
}

export default TweetList

