import * as React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import Link from '../components/link'
import { media } from '../utils'
import styled from 'styled-components'

import PageYear from '../containers/page_year'
import PageMonth from '../containers/page_month'
import PageDay from '../containers/page_day'

import PrivateRoute from '../auth/private_route'
import GlobalNav from '../auth/global_nav'
import Signup from '../auth/signup'
import Login from '../auth/login'

interface Props {
  transitTo(url: string, auth: object, history?: object): void
  history: object
  auth: object
}
export default class Router extends React.Component<Props> {
  static childContextTypes = {
    onLinkClick: PropTypes.func,
  }

  constructor(props: Props) {
    super(props)
  }

  getChildContext() {
    return {
      onLinkClick: this.onLinkClick.bind(this),
    }
  }

  componentDidMount() {
    const { auth, transitTo } = this.props

    const url: string = document.location.href
    transitTo(url, auth)

    window.addEventListener('popstate', () => {
      const url: string = document.location.href
      transitTo(url, auth)
    })
  }

  onLinkClick(event: any): void {
    if (!event.metaKey) {
      event.preventDefault()
      const { auth, transitTo, history } = this.props
      const anchorElement = event.currentTarget.pathname ? event.currentTarget : event.currentTarget.querySelector('a')
      const url: string = anchorElement.getAttribute('href')
      transitTo(url, auth, history)
    }
  }

  render() {
    return (
      <Wrap>
        <Logo>
          <Link href="/">かんたんな家計簿</Link>
        </Logo>
        <GlobalNav />
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={PageMonth} />
          <PrivateRoute exact path="/month/:year/:month" component={PageMonth} />
          <PrivateRoute exact path="/day/:year/:month/:day" component={PageDay} />
          <PrivateRoute exact path="/year/:year/" component={PageYear} />
        </Switch>
      </Wrap>
    )
  }
}

const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 10px 40px;
`
const Logo = styled.div`
  margin: 20px 0 20px;
  ${media.sp`
    text-align: center;
    margin-bottom: 30px;
  `}
}
`
