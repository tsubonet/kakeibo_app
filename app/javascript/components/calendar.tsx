import * as React from 'react'
import Link from '../components/link'
import { getHoliday } from '../utils'
import { Date, Record } from '../types/index'

interface Props {
  date: Date
  records: Record[]
}
export default class Calendar extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  getToday() {
    return {
      year: new Date().getFullYear(), // 今日の「年」(4桁までの年)
      month: new Date().getMonth() + 1, // 今日の「月」(0-11)+1
      date: new Date().getDate(), // 今日の「日」(1-31)
    }
  }

  isHoliday(dd) {
    const { date } = this.props
    const holidayList = getHoliday(date.year)
      .filter((holiday, i) => {
        return parseInt(holiday.month) === date.month // 当月のみ格納
      })
      .map((holiday, i) => {
        return holiday.day
      })
    return holidayList.indexOf(String(dd)) > -1
  }

  addDayClass(i, dd = null) {
    const { date } = this.props
    let decorate = []
    if (i === 5) {
      decorate.push('sat')
    } else if (i === 6) {
      decorate.push('sun')
    }
    if (this.isHoliday(dd)) {
      decorate.push('holiday')
    }
    if (this.getToday().year === date.year && this.getToday().month === date.month && this.getToday().date === dd) {
      decorate.push('today')
    }
    return decorate.length === 0 ? null : decorate.join(' ')
  }

  render() {
    const { date, records } = this.props
    const days = ['月', '火', '水', '木', '金', '土', '日']
    const daysLength = days.length
    const endOfPrevMonth = new Date(date.year, date.month - 1, 0) // 前月末
    const endOfCurrentMonth = new Date(date.year, date.month, 0) // 当月末
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
          <Link href={`/month/${date.year}/${date.month}`}>
            {date.year}年<span>{date.month}</span>月
          </Link>
        </div>
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
                        const filteredRecords = records.filter(record => {
                          //const pattern = new RegExp('\\d{4}-\\d{2}-' + String(dd).padStart(2, '0'));
                          const pattern = new RegExp(
                            String(date.year).padStart(4, '0') +
                              '-' +
                              String(date.month).padStart(2, '0') +
                              '-' +
                              String(dd).padStart(2, '0')
                          )
                          return pattern.test(record.done_on)
                        })
                        return (
                          <td className={this.addDayClass(j, dd)} key={j}>
                            {(() => {
                              if (typeof dd !== 'undefined') {
                                return (
                                  <Link href={`/day/${date.year}/${date.month}/${dd}`}>
                                    <div>{dd}</div>
                                    {(() => {
                                      if (filteredRecords.length) {
                                        return (
                                          <div>
                                            {(() => {
                                              return filteredRecords.reduce((previous, current) => {
                                                return previous + current.price
                                              }, 0)
                                            })()}
                                            円
                                          </div>
                                        )
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
