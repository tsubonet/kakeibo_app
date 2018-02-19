import PropTypes from 'prop-types'
import * as React from 'react'

export default class Link extends React.Component<any, any> {
  static contextTypes = {
    onLinkClick: PropTypes.func,
  }

  onClick(event) {
    this.context.onLinkClick(event)
  }

  render() {
    return (
      <a onClick={this.onClick.bind(this)} {...this.props}>
        {this.props.children}
      </a>
    )
  }
}
