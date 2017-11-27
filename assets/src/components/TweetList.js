import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TweetItem from './TweetItem'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class TweetList extends Component {
  static propTypes = {
    tweets: PropTypes.array
  }

  render() {
    const { tweets } = this.props
    return (
      <Paper>
        <List>
          <TransitionGroup>
            {tweets.map((tweet, i) =>
              <CSSTransition key={tweets.length - i}
                classNames="fademove"
                timeout={500}>
                <div>
                  <TweetItem tweet={tweet} />
                  <Divider />
                </div>
              </CSSTransition>
            )}
          </TransitionGroup>
        </List>
      </Paper>
    );
  }
}

export default TweetList

