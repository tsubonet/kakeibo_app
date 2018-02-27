import * as React from 'react'
import Link from '../components/link'
import RecordItem from '../components/record_item'
import { Date, Record } from '../types/index'

interface Props {
  date: Date
  records: Record[]
  postRecord(data: any): void
  patchRecord(record: Record, data: any): void
  deleteRecord(record: Record): void
}
interface State {
  sort: string
  sortCustom: string
  price: number
}
export default class PageDay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      sort: '食費',
      sortCustom: '',
      price: 0,
    }
    this.postRecord = this.postRecord.bind(this)
  }

  postRecord(e) {
    e.preventDefault()
    const { date, postRecord } = this.props
    const { sort, sortCustom, price } = this.state
    const tempSort = sort === '項目を入力する' ? sortCustom : sort
    const data = {
      done_on: `${date.year}-${date.month}-${date.day}`,
      sort: tempSort,
      price,
    }
    postRecord(data)
    this.setState({
      sort: '食費',
      sortCustom: '',
      price: 0,
    })
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
    const { sort, price, sortCustom } = this.state
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
            <tr>
              <td>
                <select
                  value={sort}
                  onChange={e => {
                    this.setState({ sort: e.target.value })
                  }}
                >
                  <option value="食費">食費</option>
                  <option value="外食費">外食費</option>
                  <option value="雑費">雑費</option>
                  <option value="子供関係">子供関係</option>
                  <option value="その他">その他</option>
                  <option value="項目を入力する">項目を入力する</option>
                </select>
                {(() => {
                  if (sort === '項目を入力する') {
                    return (
                      <input
                        type="text"
                        value={sortCustom}
                        onChange={e => {
                          this.setState({ sortCustom: e.target.value })
                        }}
                      />
                    )
                  }
                })()}
              </td>
              <td>
                <input
                  type="number"
                  value={price}
                  onChange={e => {
                    this.setState({ price: parseInt(e.target.value) })
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
