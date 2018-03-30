import * as React from 'react'
import { LinkContext } from '../context'

export default class Link extends React.Component<any> {
  render() {
    return (
      <LinkContext.Consumer>
        {({ actions }) => {
          return (
            <a onClick={e => actions.onLinkClick(e)} {...this.props}>
              {this.props.children}
            </a>
          )
        }}
      </LinkContext.Consumer>
    )
  }
}
