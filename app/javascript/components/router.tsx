import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Link from '../components/link'
import { media } from '../utils'
import styled from 'styled-components'
import { Auth } from '../types/index'

import PageYear from '../containers/page_year'
import PageMonth from '../containers/page_month'
import PageDay from '../containers/page_day'

import PrivateRoute from '../auth/private_route'
import GlobalNav from '../auth/global_nav'
import Signup from '../auth/signup'
import Login from '../auth/login'

import { LinkContext } from '../context'

interface Props {
  history: object
  auth: Auth
  transitTo(url: string, auth: Auth, history?: object): void
}

export default class Router extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    const { auth, transitTo } = this.props
    const url: string = document.location.href

    const fetchData = () => {
      transitTo(url, auth)
    }

    if (!/signup|login/.test(url)) {
      fetchData()
    }
    window.addEventListener('popstate', () => {
      fetchData()
    })
  }

  onLinkClick(event): void {
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
        <LinkContext.Provider
          value={{
            actions: {
              onLinkClick: e => this.onLinkClick(e),
            },
          }}
        >
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
        </LinkContext.Provider>
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
