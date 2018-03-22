import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { StoreState } from '../types/index'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

function mapStateToProps({ auth }: StoreState) {
  const { isAuthenticated } = auth
  return { isAuthenticated }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))
