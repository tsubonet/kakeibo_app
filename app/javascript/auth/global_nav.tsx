import * as React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
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
    const { auth, dispatch } = this.props
    e.preventDefault()
    dispatch(signout(auth))
  }
  render() {
    const { auth } = this.props
    return (
      <div>
        <div>
          {!auth.isAuthenticated && <MenuLink to="/signup" label="新規登録" />}{' '}
          {!auth.isAuthenticated && <MenuLink to="/login" label="ログイン" />}
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

interface MenuProps {
  label: string
  to: string
  activeOnlyWhenExact?: boolean
}
const MenuLink = ({ label, to, activeOnlyWhenExact }: MenuProps) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <div className={match ? 'active' : ''}>
        {match ? '> ' : ''}
        <Link href={to}>{label}</Link>
      </div>
    )}
  />
)

function mapStateToProps({ auth }: StoreState) {
  return { auth }
}

export default withRouter(connect(mapStateToProps)(GlobalNav))
