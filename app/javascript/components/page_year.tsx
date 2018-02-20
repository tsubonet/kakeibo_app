import * as React from 'react'
import { getHoliday } from '../utils'
import Link from '../components/link'
import Calendar from '../components/calendar'
import { Date, Record } from '../types/index'

interface Props {
  date: Date
  records: Record[]
}
interface State {
  date: Date
  records: Record[]
}
export default class PageYear extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = props
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState(nextProps)
  }

  render() {
    // typescriptが通らないので一時的に
    // [...Array(12).keys()]をArray.from(Array(12), (v, k) => k)に修正
    return (
      <div>
        {(() => {
          return Array.from(Array(12), (v, k) => k).map((row, i) => {
            let date = Object.assign({}, this.state.date)
            date.month = row + 1
            return <Calendar key={i} date={date} records={this.state.records} />
          })
        })()}
        <Link href={`/month/${this.state.date.year}/${this.state.date.month}`}>
          <i className="fas fa-angle-left" /> もどる
        </Link>
      </div>
    )
  }
}
