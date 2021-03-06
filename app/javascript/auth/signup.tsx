import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchRootProps } from '../actions/common'
import { withRouter } from 'react-router'
import { StoreState, Auth } from '../types/index'

interface Props {
  auth: Auth
  history
  transitTo
  authenticate
}
interface State {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  redirectToReferrer: boolean
  errorMessages: string[]
}

class Signup extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      redirectToReferrer: false,
      errorMessages: [],
    }
  }

  componentDidMount() {
    const { auth, transitTo, history } = this.props
    if (auth.isAuthenticated) {
      transitTo('/', auth, history)
    }
  }

  handleSubmit() {
    const { history } = this.props
    const { name, email, password, passwordConfirmation } = this.state
    const fb = new FormData()
    fb.append('name', name)
    fb.append('email', email)
    fb.append('password', password)
    fb.append('password_confirmation', passwordConfirmation)
    fetch('/auth', {
      method: 'POST',
      body: fb,
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success') {
          history.push('/login', { message: '登録完了しました、ログインしてください' })
          //this.setState({ redirectToReferrer: true })
        } else {
          this.setState({ errorMessages: json.errors.full_messages })
        }
      })
  }

  render() {
    const { name, email, password, passwordConfirmation, redirectToReferrer, errorMessages } = this.state

    if (redirectToReferrer) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <h2>Signup</h2>

        {(() => {
          if (errorMessages.length) {
            return (
              <div>
                {(() => {
                  return errorMessages.map((message, i) => {
                    return <div key={i}>{message}</div>
                  })
                })()}
              </div>
            )
          }
        })()}

        <p>
          Name: <input type="text" value={name} onChange={e => this.setState({ name: e.target.value })} />
        </p>
        <p>
          Email: <input type="text" value={email} onChange={e => this.setState({ email: e.target.value })} />
        </p>
        <p>
          Password:{' '}
          <input type="password" value={password} onChange={e => this.setState({ password: e.target.value })} />
        </p>
        <p>
          Password Confirmation:{' '}
          <input
            type="password"
            value={passwordConfirmation}
            onChange={e => this.setState({ passwordConfirmation: e.target.value })}
          />
        </p>
        <p>
          <input type="submit" value="Signup" onClick={this.handleSubmit.bind(this)} />
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup))
