import * as React from 'react'
import Link from '../components/link'
import Calendar from '../components/calendar'
import Charts from '../components/charts'
import { Date, Record } from '../types/index'

interface Props {
  date: Date
  records: Record[]
}
export default class PageMonth extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  prevCalendar(): string {
    const { date } = this.props
    if (date.month === 1) {
      return `/month/${date.year - 1}/12`
    } else {
      return `/month/${date.year}/${date.month - 1}`
    }
  }

  nextCalendar(): string {
    const { date } = this.props
    if (date.month === 12) {
      return `/month/${date.year + 1}/1`
    } else {
      return `/month/${date.year}/${date.month + 1}`
    }
  }

  render() {
    const { date } = this.props
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
              <Link href={`/year/${date.year}`}>{date.year}年一覧</Link>
            </li>
          </ul>
        </nav>
        <Calendar {...this.props} />
        <Charts {...this.props} />
      </div>
    )
  }
}
