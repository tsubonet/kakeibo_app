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
    const { isAuthenticated } = this.props.auth
    return (
      <div>
        <div>
          {!isAuthenticated && <Link href="/signup">新規登録</Link>}{' '}
          {!isAuthenticated && <Link href="/login">ログイン</Link>}
          {isAuthenticated && (
            <a href="#" onClick={this.signout.bind(this)}>
              ログアウト
            </a>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  return { auth }
}

export default connect(mapStateToProps)(GlobalNav)
