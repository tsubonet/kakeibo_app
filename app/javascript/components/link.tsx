import * as React from 'react'
import { LinkContext } from '../context'

const Link = props => {
  return (
    <LinkContext.Consumer>
      {({ actions }) => {
        return (
          <a onClick={e => actions.onLinkClick(e)} {...props}>
            {props.children}
          </a>
        )
      }}
    </LinkContext.Consumer>
  )
}

export default Link
