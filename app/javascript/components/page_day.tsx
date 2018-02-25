import * as React from 'react'
import Link from '../components/link'
import { sendPost, sendPatch } from '../utils'
import { Date, Record } from '../types/index'

interface Props {
  date: Date
  record: Record
  patchRecord(record: Record, result: string): void
  postRecord(date: Date, result: string): void
  deleteRecord(record: Record): void
}
interface State {
  date: Date
  record: Record
  isEdit: boolean
}

export default class PageDay extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
    }
    this.postRecord = this.postRecord.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  postRecord(e) {
    e.preventDefault()
    this.props.postRecord(this.state.date, 'a')
  }

  getDay(): string {
    const { date } = this.state
    const dayNames = ['日', '月', '火', '水', '木', '金', '土']
    const targetDay = new Date(date.year, date.month - 1, date.day)
    const day = targetDay.getDay()
    return dayNames[day]
  }

  render() {
    const { date, record, isEdit } = this.state
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
              if (record !== null) {
                return <div>aaa</div>
              } else {
                return <div className="record-empty">まだ記入がありません</div>
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
            <tr>
              <td>
                <select ref="type">
                  <option value="shokuhi">食費</option>
                  <option value="gaishokuhi">外食費</option>
                  <option value="zappi">雑費</option>
                  <option value="kodomo">子供関係</option>
                  <option value="other">その他</option>
                </select>
              </td>
              <td>
                <input ref="price" type="number" defaultValue="0" />円
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
