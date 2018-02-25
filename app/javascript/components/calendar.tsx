import * as React from 'react'
import Link from '../components/link'
import BudgetItem from '../components/budget_item'
import { getHoliday } from '../utils'
import { Date, Record, Budget } from '../types/index'

interface Props {
  date: Date
  budget: Budget
  records: Record[]
}
interface State {
  date: Date
  budget: Budget
  records: Record[]
}
export default class Calendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = props
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState(nextProps)
  }

  getToday() {
    return {
      year: new Date().getFullYear(), // 今日の「年」(4桁までの年)
      month: new Date().getMonth() + 1, // 今日の「月」(0-11)+1
      date: new Date().getDate(), // 今日の「日」(1-31)
    }
  }

  isHoliday(dd) {
    const holidayList = getHoliday(this.state.date.year)
      .filter((holiday, i) => {
        return parseInt(holiday.month) === this.state.date.month // 当月のみ格納
      })
      .map((holiday, i) => {
        return holiday.day
      })
    return holidayList.indexOf(String(dd)) > -1
  }

  addDayClass(i, dd = null) {
    let date = []
    if (i === 5) {
      date.push('sat')
    } else if (i === 6) {
      date.push('sun')
    }
    if (this.isHoliday(dd)) {
      date.push('holiday')
    }
    if (
      this.getToday().year === this.state.date.year &&
      this.getToday().month === this.state.date.month &&
      this.getToday().date === dd
    ) {
      date.push('today')
    }
    return date.length === 0 ? null : date.join(' ')
  }

  render() {
    const days = ['月', '火', '水', '木', '金', '土', '日']
    const daysLength = days.length
    const endOfPrevMonth = new Date(this.state.date.year, this.state.date.month - 1, 0) // 前月末
    const endOfCurrentMonth = new Date(this.state.date.year, this.state.date.month, 0) // 当月末
    const endOfPrevMonthDay = endOfPrevMonth.getDay() // 前月末曜日 (0-6)
    const endOfCurrentMonthDate = endOfCurrentMonth.getDate() // 当月末日付 (1-31)
    const rows = Math.ceil((endOfPrevMonthDay + endOfCurrentMonthDate) / daysLength) // カレンダーの行数

    let cells = new Array(daysLength * rows) // 表のセル数を用意
    for (let i = 0; i < endOfCurrentMonthDate; i++) {
      cells[endOfPrevMonthDay + i] = i + 1 // 日付を埋め込む
    }

    return (
      <div>
        <div data-role="caption">
          <Link href={`/month/${this.state.date.year}/${this.state.date.month}`}>
            {this.state.date.year}年<span>{this.state.date.month}</span>月
          </Link>
        </div>
        <BudgetItem budget={this.state.budget} />
        <table>
          <thead>
            <tr>
              {(() => {
                return days.map((day, i) => {
                  return (
                    <th className={this.addDayClass(i)} key={i}>
                      {day}
                    </th>
                  )
                })
              })()}
            </tr>
          </thead>
          <tbody>
            {(() => {
              return Array.from(Array(rows), (v, k) => k).map((row, i) => {
                return (
                  <tr key={i}>
                    {(() => {
                      return days.map((day, j) => {
                        const dd = cells[j + i * daysLength]
                        const record = this.state.records.find(record => {
                          //const pattern = new RegExp('\\d{4}-\\d{2}-' + String(dd).padStart(2, '0'));
                          const pattern = new RegExp(
                            String(this.state.date.year).padStart(4, '0') +
                              '-' +
                              String(this.state.date.month).padStart(2, '0') +
                              '-' +
                              String(dd).padStart(2, '0')
                          )
                          return pattern.test(record.done_on)
                        })
                        return (
                          <td className={this.addDayClass(j, dd)} key={j}>
                            {(() => {
                              if (typeof dd !== 'undefined') {
                                const result = typeof record !== 'undefined' ? record.result : null
                                return (
                                  <Link
                                    href={`/day/${this.state.date.year}/${this.state.date.month}/${dd}`}
                                    className={'calendar-image ' + result}
                                  >
                                    <div>{dd}</div>
                                    {(() => {
                                      if (result === null) {
                                        return <i className={'fas fa-plus-circle fa-2x '} />
                                      }
                                    })()}
                                  </Link>
                                )
                              }
                            })()}
                          </td>
                        )
                      })
                    })()}
                  </tr>
                )
              })
            })()}
          </tbody>
        </table>
      </div>
    )
  }
}
