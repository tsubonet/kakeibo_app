import * as React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import Link from '../components/link'

import PageYearContainer from '../containers/page_year_container'
import PageMonthContainer from '../containers/page_month_container'
import PageDayContainer from '../containers/page_day_container'

interface Props {
  transitTo(url: string, { pushState }): void
  transitTo(url: string, { pushState }, callback): void
  history: any
}
interface State {
  rootProps: Props
}
export default class Router extends React.Component<Props, State> {
  static childContextTypes = {
    onLinkClick: PropTypes.func,
  }

  constructor(props: Props) {
    //super(...args)
    super(props)
    this.state = {
      rootProps: props,
    }
  }

  componentWillReceiveProps(nextProps: Props) {
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
      const url: string = document.location.href
      this.props.transitTo(url, { pushState: false })
    })
  }

  onLinkClick(event: any): void {
    if (!event.metaKey) {
      event.preventDefault()
      const anchorElement = event.currentTarget.pathname ? event.currentTarget : event.currentTarget.querySelector('a')
      const url: string = anchorElement.getAttribute('href')
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
