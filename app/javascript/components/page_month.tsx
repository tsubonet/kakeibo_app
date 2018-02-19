import * as React from 'react'
import Link from '../components/link'
import Calendar from '../components/calendar'
import Charts from '../components/charts'

export default class PageMonth extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = props
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  prevCalendar() {
    if (this.state.date.month === 1) {
      return `/month/${this.state.date.year - 1}/12`
    } else {
      return `/month/${this.state.date.year}/${this.state.date.month - 1}`
    }
  }

  nextCalendar() {
    if (this.state.date.month === 12) {
      return `/month/${this.state.date.year + 1}/1`
    } else {
      return `/month/${this.state.date.year}/${this.state.date.month + 1}`
    }
  }

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link href={this.prevCalendar()} data-link="prev">
                <i className="fas fa-angle-left fa-2x" />prev
              </Link>
            </li>
            <li>
              <Link href={this.nextCalendar()} data-link="next">
                <i className="fas fa-angle-right fa-2x" />next
              </Link>
            </li>
            <li>
              <Link href="/">今月</Link>
            </li>
            <li>
              <Link href={`/year/${this.state.date.year}`}>{this.state.date.year}年一覧</Link>
            </li>
          </ul>
        </nav>
        <Calendar {...this.state} />
        <Charts {...this.state} />
      </div>
    )
  }
}
