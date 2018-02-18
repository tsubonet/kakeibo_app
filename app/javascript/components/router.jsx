import PropTypes from 'prop-types'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Link from '../components/link'

import PageYearContainer from '../containers/page_year_container'
import PageMonthContainer from '../containers/page_month_container'
import PageDayContainer from '../containers/page_day_container'

export default class Router extends React.Component {
  static childContextTypes = {
    onLinkClick: PropTypes.func,
  }

  constructor(...args) {
    super(...args)
    this.state = {
      rootProps: this.props,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rootProps: nextProps,
    })
  }

  getChildContext() {
    return {
      onLinkClick: this.onLinkClick.bind(this),
    }
  }

  componentDidMount() {
    window.addEventListener('popstate', () => {
      this.props.transitTo(document.location.href, { pushState: false })
    })
  }

  onLinkClick(event) {
    if (!event.metaKey) {
      event.preventDefault()
      const anchorElement = event.currentTarget.pathname ? event.currentTarget : event.currentTarget.querySelector('a')
      const url = anchorElement.getAttribute('href')
      this.props.transitTo(url, { pushState: true }, () => this.props.history.push(url))
    }
  }

  render() {
    return (
      <div>
        <div>
          <Link href="/">たいせいくんのラジオ体操</Link>
        </div>
        <Switch>
          <Route exact path="/" component={PageMonthContainer} />
          <Route exact path="/month/:year/:month" component={PageMonthContainer} />
          <Route exact path="/day/:year/:month/:day" component={PageDayContainer} />
          <Route exact path="/year/:year/" component={PageYearContainer} />
        </Switch>
      </div>
    )
  }
}
