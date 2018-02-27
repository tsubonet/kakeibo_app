import * as React from 'react'
import Link from '../components/link'
import RecordItem from '../components/record_item'
import { Date, Record } from '../types/index'
import InputExpense from './input_expense'

interface Props {
  date: Date
  records: Record[]
  postRecord(data: any): void
  patchRecord(record: Record, data: any): void
  deleteRecord(record: Record): void
}

export default class PageDay extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.onCreate = this.onCreate.bind(this)
  }

  onCreate(data) {
    const { date, postRecord } = this.props
    const _data = {
      ...data,
      done_on: `${date.year}-${date.month}-${date.day}`,
    }
    postRecord(_data)
  }

  getDay(): string {
    const { date } = this.props
    const dayNames = ['日', '月', '火', '水', '木', '金', '土']
    const targetDay = new Date(date.year, date.month - 1, date.day)
    const day = targetDay.getDay()
    return dayNames[day]
  }

  render() {
    const { date, records, deleteRecord, patchRecord } = this.props
    return (
      <div>
        <p>
          {date.year}年{date.month}月{date.day}日({this.getDay()})
        </p>
        <dl>
          <dt>
            <i className="fas fa-hand-point-down" /> この日の出費は...
          </dt>
          <dd>
            {(() => {
              if (records.length) {
                return (
                  <div>
                    {(() => {
                      return records.reduce((previous, current) => {
                        return previous + current.price
                      }, 0)
                    })()}
                    円
                  </div>
                )
              } else {
                return <div>まだ登録されてません</div>
              }
            })()}
          </dd>
        </dl>
        <table>
          <thead>
            <tr>
              <th>項目</th>
              <th>金額</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(() => {
              if (records.length) {
                return records.map(record => {
                  return <RecordItem key={record.id} record={record} onDelete={deleteRecord} onUpdate={patchRecord} />
                })
              }
            })()}
            <InputExpense sort="食費" price={0} onCreate={this.onCreate} />
          </tbody>
        </table>
        <Link href={`/month/${date.year}/${date.month}`}>
          <i className="fas fa-angle-left" /> カレンダーにもどる
        </Link>
      </div>
    )
  }
}
