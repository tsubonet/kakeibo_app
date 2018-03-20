import * as React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import Link from '../components/link'
import { media } from '../utils'
import styled from 'styled-components'

import PageYearContainer from '../containers/page_year_container'
import PageMonthContainer from '../containers/page_month_container'
import PageDayContainer from '../containers/page_day_container'

import GlobalNav from '../auth/globalNav'
import Signup from '../auth/signup'
import Login from '../auth/login'

interface Props {
  transitTo(url: string, { pushState }: { pushState: boolean }): void
  transitTo(url: string, { pushState }: { pushState: boolean }, history: object): void
  history: object
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
    const { transitTo } = this.props
    window.addEventListener('popstate', () => {
      const url: string = document.location.href
      transitTo(url, { pushState: false })
    })
  }

  onLinkClick(event: any): void {
    if (!event.metaKey) {
      event.preventDefault()
      const { transitTo, history } = this.props
      const anchorElement = event.currentTarget.pathname ? event.currentTarget : event.currentTarget.querySelector('a')
      const url: string = anchorElement.getAttribute('href')
      transitTo(url, { pushState: true }, history)
    }
  }

  render() {
    return (
      <Wrap>
        <Logo>
          <Link href="/">かんたんな家計簿</Link>
        </Logo>
        <GlobalNav />

        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Switch>
          <Route exact path="/" component={PageMonthContainer} />
          <Route exact path="/month/:year/:month" component={PageMonthContainer} />
          <Route exact path="/day/:year/:month/:day" component={PageDayContainer} />
          <Route exact path="/year/:year/" component={PageYearContainer} />
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
