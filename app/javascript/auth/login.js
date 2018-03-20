import React from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../actions/auth'
import { fetchRootProps } from '../actions/records'
import { withRouter } from 'react-router'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    const { isAuthenticated, transitTo, history } = this.props
    if (isAuthenticated) {
      transitTo('/', { pushState: true }, history)
    }
  }

  handleSubmit() {
    const { authenticate } = this.props
    const { email, password } = this.state
    authenticate(email, password)
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <p>
          Email: <input type="text" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
        </p>
        <p>
          Password:{' '}
          <input type="text" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
        </p>
        <p>
          <input type="submit" value="Login" onClick={this.handleSubmit.bind(this)} />
        </p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  const { loading, isAuthenticated } = auth
  return {
    loading,
    isAuthenticated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    transitTo: (url, pushState, callback) => {
      dispatch(fetchRootProps(url, pushState, callback))
    },
    authenticate: (email, password) => {
      dispatch(authenticate(email, password))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
