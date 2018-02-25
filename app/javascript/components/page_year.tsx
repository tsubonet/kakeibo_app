import * as React from 'react'
import { getHoliday } from '../utils'
import Link from '../components/link'
import Calendar from '../components/calendar'
import { Date, Record } from '../types/index'

interface Props {
  date: Date
  recordsYear: Record[][]
}
interface State {
  date: Date
  recordsYear: Record[][]
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
    return (
      <div>
        {(() => {
          return this.state.recordsYear.map((records, i) => {
            let date = Object.assign({}, this.state.date)
            date.month = i + 1
            return <Calendar key={i} date={date} records={records} />
          })
        })()}
        <Link href={`/`}>
          <i className="fas fa-angle-left" /> 今月にもどる
        </Link>
      </div>
    )
  }
}
