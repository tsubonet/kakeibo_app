import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchRootProps } from '../actions/records'
import { withRouter } from 'react-router'

class Login extends React.Component {
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

  handleSubmit() {
    const { name, email, password, passwordConfirmation } = this.state
    const fb = new FormData()
    fb.append('name', name)
    fb.append('email', email)
    fb.append('password', password)
    fb.append('password_confirmation', passwordConfirmation)
    fetch('/auth', {
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: fb,
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success') {
          this.setState({ redirectToReferrer: true })
        } else {
          this.setState({ errorMessages: json.errors.full_messages })
        }
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/login' } }
    const { name, email, password, passwordConfirmation, redirectToReferrer, errorMessages } = this.state
    const { isAuthenticated } = this.props

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    if (isAuthenticated) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <h2>Signup</h2>

        {(() => {
          if (errorMessages.length) {
            return errorMessages.map((message, i) => {
              return <div key={i}>{message}</div>
            })
          }
        })()}

        <p>
          Name: <input type="text" value={name} onChange={e => this.setState({ name: e.target.value })} />
        </p>
        <p>
          Email: <input type="text" value={email} onChange={e => this.setState({ email: e.target.value })} />
        </p>
        <p>
          Password: <input type="text" value={password} onChange={e => this.setState({ password: e.target.value })} />
        </p>
        <p>
          Password Confirmation:{' '}
          <input
            type="text"
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

function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated } = auth
  return { isAuthenticated }
}

const mapDispatchToProps = dispatch => {
  return {
    transitTo: (url, pushState, callback) => {
      dispatch(fetchRootProps(url, pushState, callback))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
