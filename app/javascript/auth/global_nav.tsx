import * as React from 'react'
import { connect } from 'react-redux'
import Link from '../components/link'
import { signout } from '../actions/auth'
import { StoreState, Auth } from '../types/index'

interface Props {
  auth: Auth
  dispatch
}
class GlobalNav extends React.Component<Props> {
  signout(e) {
    const { auth } = this.props
    e.preventDefault()
    this.props.dispatch(signout(auth))
  }

  render() {
    const { auth } = this.props
    return (
      <div>
        <div>
          {!auth.isAuthenticated && <Link href="/signup">新規登録</Link>}{' '}
          {!auth.isAuthenticated && <Link href="/login">ログイン</Link>}
          {auth.isAuthenticated && (
            <a href="#" onClick={this.signout.bind(this)}>
              ログアウト
            </a>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }: StoreState) {
  return { auth }
}

export default connect(mapStateToProps)(GlobalNav)
