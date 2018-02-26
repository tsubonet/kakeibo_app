import * as React from 'react'
import Link from '../components/link'
import RecordItem from '../components/record_item'
import { sendPost, sendPatch } from '../utils'
import { Date, Record } from '../types/index'

interface Props {
  date: Date
  records: Record[]
  postRecord(data: any): void
  patchRecord(record: Record, result: string): void
  deleteRecord(record: Record): void
}
export default class PageDay extends React.Component<Props> {
  private priceVal: HTMLInputElement
  private sortVal: HTMLSelectElement

  constructor(props: Props) {
    super(props)
    this.postRecord = this.postRecord.bind(this)
  }

  postRecord(e) {
    e.preventDefault()
    const { date, postRecord } = this.props
    const data = {
      done_on: `${date.year}-${date.month}-${date.day}`,
      sort: this.sortVal.value,
      price: this.priceVal.value,
    }
    postRecord(data)
  }

  getDay(): string {
    const { date } = this.props
    const dayNames = ['日', '月', '火', '水', '木', '金', '土']
    const targetDay = new Date(date.year, date.month - 1, date.day)
    const day = targetDay.getDay()
    return dayNames[day]
  }

  render() {
    const { date, records } = this.props

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
                return records.map((record, index) => {
                  return <RecordItem key={index} record={record} onDelete={this.props.deleteRecord} />
                })
              }
            })()}
            <tr>
              <td>
                <select
                  ref={(input: HTMLSelectElement) => {
                    this.sortVal = input
                  }}
                >
                  <option value="shokuhi">食費</option>
                  <option value="gaishokuhi">外食費</option>
                  <option value="zappi">雑費</option>
                  <option value="kodomo">子供関係</option>
                  <option value="other">その他</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  defaultValue="0"
                  ref={(input: HTMLInputElement) => {
                    this.priceVal = input
                  }}
                />円
              </td>
              <td />
            </tr>
          </tbody>
        </table>
        <div>
          <button onClick={this.postRecord}>登録</button>
        </div>

        <Link href={`/month/${date.year}/${date.month}`}>
          <i className="fas fa-angle-left" /> カレンダーにもどる
        </Link>
      </div>
    )
  }
}
