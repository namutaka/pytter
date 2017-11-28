import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedRelative } from 'react-intl'

class TweetItem extends Component {
  static propTypes = {
    tweet: PropTypes.object
  }

  renderTitle(tweet) {
    return "@" + tweet.author.name + " (" + tweet.author.display_name + ")"
  }

  render() {
    const { tweet } = this.props
    return (
      <ListItem
        leftAvatar={
          <Avatar
            size={30}
            style={{margin: '10px 5px'}}
          >
          {tweet.author.name[0].toUpperCase()}
          </Avatar>
        }>
        <div className="valign-wrapper">
          <strong>{tweet.author.display_name}</strong>
          <span className='username'
            style={{
              display: 'inline-block',
              color: Colors.lightBlack,
              marginLeft: 5
            }}>@{tweet.author.name}</span>

          <small
            style={{
              display: 'inline-block',
              color: Colors.lightBlack,
              marginLeft: 5
            }}>
            <FormattedRelative updateInterval={10000}
              value={new Date(tweet.created_at)} />
          </small>
        </div>
        <div style={{marginTop: 8}}>{ tweet.text }</div>
      </ListItem>
    )
  }
}

export default TweetItem


