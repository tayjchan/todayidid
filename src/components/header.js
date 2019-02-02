import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Header extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    return (
      <h1>${this.props.text}</h1>
    )
  }
}
