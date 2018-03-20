import React from 'react'
import { connect } from 'react-redux'
import Link from '../components/link'
//import { signout } from './modules/auth'

class GlobalNav extends React.Component {
  signout(e) {
    e.preventDefault()
    this.props.dispatch(signout())
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
  return { isAuthenticated }
}

export default connect(mapStateToProps)(GlobalNav)
