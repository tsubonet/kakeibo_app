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
  //   const { auth, transitTo, history } = nextProps
  //   if (auth.isAuthenticated) {
  //     transitTo('/', auth, history)
  //   }
  // }

  handleSubmit() {
    const { authenticate, history } = this.props
    const { email, password } = this.state
    authenticate(email, password, history)
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
    authenticate: (email, password, history) => {
      dispatch(authenticate(email, password, history))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
