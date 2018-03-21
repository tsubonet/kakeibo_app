import React from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../actions/auth'
import { fetchRootProps } from '../actions/common'
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
    const { auth, transitTo, history } = this.props
    if (auth.isAuthenticated) {
      transitTo('/', auth, history)
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { transitTo, history } = this.props
  //   if (nextProps.isAuthenticated) {
  //     transitTo('/', { pushState: true }, history)
  //   }
  // }

  handleSubmit() {
    const { authenticate } = this.props
    const { email, password } = this.state
    authenticate(email, password)
  }

  render() {
    const { auth } = this.props
    const { email, password } = this.state
    return (
      <div>
        <h2>Login</h2>
        {(() => {
          if (auth.fail) {
            return <div>失敗しました</div>
          }
        })()}

        <p>
          Email: <input type="text" value={email} onChange={e => this.setState({ email: e.target.value })} />
        </p>
        <p>
          Password:{' '}
          <input type="password" value={password} onChange={e => this.setState({ password: e.target.value })} />
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
  return { auth }
}

const mapDispatchToProps = dispatch => {
  return {
    transitTo: (url, auth, history) => {
      dispatch(fetchRootProps(auth, url, history))
    },
    authenticate: (email, password) => {
      dispatch(authenticate(email, password))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
