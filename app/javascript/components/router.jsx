import PropTypes from 'prop-types'
import React from 'react'

import Link from '../components/link'

import PageYearContainer from '../containers/page_year_container'
import PageMonthContainer from '../containers/page_month_container'
import PageDayContainer from '../containers/page_day_container'

export default class Router extends React.Component {
  static get childContextTypes() {
    return {
      onLinkClick: PropTypes.func,
    }
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
      this.props.transitTo(anchorElement.href, { pushState: true })
    }
  }

  getComponent() {
    switch (this.state.rootProps.actionPath) {
      case 'calendar#month':
        return PageMonthContainer
      case 'calendar#day':
        return PageDayContainer
      case 'calendar#year':
        return PageYearContainer
    }
  }

  render() {
    const Component = this.getComponent()
    return (
      <div>
        <div>
          <Link href="/">たいせいくんのラジオ体操</Link>
        </div>
        <Component {...this.state.rootProps} />
      </div>
    )
  }
}
