import * as React from 'react'
import Link from '../components/link'
import RecordItem from '../components/record_item'
import Charts from '../components/charts'
import InputExpense from '../components/input_expense'
import { Date, Record, RecordData } from '../types/index'
import styled from 'styled-components'
import { media } from '../utils'

interface Props {
  date: Date
  records: Record[]
  postRecord(data: RecordData): void
  patchRecord(record: Record, data: RecordData): void
  deleteRecord(record: Record): void
}

export default class PageDay extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.onCreate = this.onCreate.bind(this)
  }

  onCreate(data: RecordData) {
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
        <Caption>
          {date.year}年<span>{date.month}</span>月<span>{date.day}</span>日({this.getDay()})
        </Caption>
        <ExpenseResult>
          <dt>この日の支出は...</dt>
          <dd>
            {(() => {
              if (records.length) {
                return (
                  <div>
                    <span>
                      {(() => {
                        return records.reduce((previous, current) => {
                          return previous + current.price
                        }, 0)
                      })()}
                    </span>{' '}
                    円
                  </div>
                )
              } else {
                return <div>まだ登録されてません</div>
              }
            })()}
          </dd>
        </ExpenseResult>
        <ExpenseDetail>
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
            <InputExpense onCreate={this.onCreate} />
          </tbody>
        </ExpenseDetail>
        <Charts records={records} />
        <Link href={`/month/${date.year}/${date.month}`}>
          <i className="fas fa-angle-left" /> カレンダーにもどる
        </Link>
      </div>
    )
  }
}

const Caption = styled.p`
  text-align: center;
  margin-bottom: 20px;
  span {
    font-size: 24px;
    font-weight: bold;
    ${media.sp`font-size: 20px;`};
  }
`
const ExpenseResult = styled.dl`
  text-align: center;
  dt {
    margin-bottom: 10px;
  }
  dd {
    margin: 0;
  }
  span {
    font-size: 40px;
    font-weight: bold;
    ${media.sp`font-size: 30px;`};
  }
`
const ExpenseDetail = styled.table`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-collapse: collapse;
  border: none;
  margin-bottom: 40px;
  th,
  td {
    text-align: left;
    box-sizing: border-box;
  }
  th {
    padding: 10px;
    font-weight: bold;
    border-bottom: 4px solid #ccc;
    ${media.pc`
      &:first-child {width: 40%;}
      &:nth-child(2) {width: 40%;}
    `};
    ${media.sp`
      &:first-child {width: 34%;}
      &:nth-child(2) {width: 34%;}
    `};
  }
  td {
    white-space: no-wrap;
    padding: 20px 10px;
    &:nth-child(2) {
      ${media.sp`padding-right: 0;`};
    }
    &:last-child {
      text-align: center;
      ${media.sp`
        padding-left: 5px;
        padding-right: 5px;
      `};
    }
  }
  tr:nth-child(even) td {
    background: #f5f5f5;
  }
  tr:nth-child(odd) td {
    background: #fdfdfd;
  }
`
