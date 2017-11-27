import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TweetItem from './TweetItem'

class TweetPostForm extends Component {

  constructor() {
    super()
    this.state = {
      text: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    var text = (this.state.text || '').trim()
    if (text === '') {
      return;
    }

    this.setState({ text: '' })
    this.props.onPost(text)
  }

  handleChange(event) {
    this.setState({text: event.target.value})
  }

  render() {
    return (
      <form>
        <textarea
          value={this.state.text}
           onChange={this.handleChange}
        />
        <RaisedButton
          label="Tweet"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}

export default TweetPostForm
