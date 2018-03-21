import React from 'react'
import { connect } from 'react-redux'
import Link from '../components/link'
import { signout } from '../actions/auth'

class GlobalNav extends React.Component {
  signout(e) {
    const { auth } = this.props
    e.preventDefault()
    this.props.dispatch(signout(auth))
  }

  render() {
    const { isAuthenticated } = this.props
    return (
      <div>
        <div>
          {!isAuthenticated && <Link href="/signup">Signup</Link>}
          {!isAuthenticated && <Link href="/login">Login</Link>}
          {isAuthenticated && (
            <a href="#" onClick={this.signout.bind(this)}>
              Signout
            </a>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated } = auth
  return { isAuthenticated, auth }
}

export default connect(mapStateToProps)(GlobalNav)
