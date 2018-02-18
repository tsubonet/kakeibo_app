import React from 'react'
import { getHoliday } from '../utils'
import Link from '../components/link'
import Calendar from '../components/calendar'

export default class PageYear extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  render() {
    return (
      <div>
        {(() => {
          return [...Array(12).keys()].map((row, i) => {
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
