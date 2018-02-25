import * as React from 'react'
import { getHoliday } from '../utils'
import Link from '../components/link'
import Calendar from '../components/calendar'
import { Date, Record } from '../types/index'

interface Props {
  date: Date
  recordsYear: Record[][]
}
export default class PageYear extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { recordsYear, date } = this.props
    return (
      <div>
        {(() => {
          return recordsYear.map((records, i) => {
            let _date = Object.assign({}, date)
            _date.month = i + 1
            return <Calendar key={i} date={_date} records={records} />
          })
        })()}
        <Link href={`/`}>
          <i className="fas fa-angle-left" /> 今月にもどる
        </Link>
      </div>
    )
  }
}
