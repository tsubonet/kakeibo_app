import * as React from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../actions/auth'
import { fetchRootProps } from '../actions/common'
import { withRouter } from 'react-router'
import { StoreState, Auth } from '../types/index'

interface Props {
  auth: Auth
  history: object
  transitTo
  authenticate
}
interface State {
  email: string
  password: string
  authFailure: boolean
}
class Login extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      authFailure: false,
    }
  }

  componentDidMount() {
    const { auth, transitTo, history } = this.props
    if (auth.isAuthenticated) {
      transitTo('/', auth, history)
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { authFailure: nextProps.auth.fail }
  }

  handleSubmit() {
    const { authenticate, history } = this.props
    const { email, password } = this.state
    authenticate(email, password, history)
  }

  render() {
    const { email, password, authFailure } = this.state
    return (
      <div>
        <h2>Login</h2>
        {(() => {
          if (authFailure) {
            return <div>正しい値を入力してください</div>
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

function mapStateToProps({ auth }: StoreState) {
  return { auth }
}

const mapDispatchToProps = dispatch => {
  return {
    transitTo: (url: string, auth: Auth, history: object) => {
      dispatch(fetchRootProps(auth, url, history))
    },
    authenticate: (email: string, password: string, history: object) => {
      dispatch(authenticate(email, password, history))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
