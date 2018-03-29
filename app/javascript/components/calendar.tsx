import * as React from 'react'
import Link from '../components/link'
import { getHoliday, media } from '../utils'
import { Date, Record } from '../types/index'
import styled from 'styled-components'

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
        return parseInt(holiday.month, 10) === date.month // 当月のみ格納
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

  getExposesSum() {
    const { records } = this.props
    return records.reduce((result, current) => {
      return result + current.price
    }, 0)
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
        <Caption>
          <Link href={`/month/${date.year}/${date.month}`}>
            {date.year}年 <span>{date.month}</span> 月
          </Link>
        </Caption>
        {(() => {
          if (records.length) {
            return (
              <Discription>
                この月の支出は合計 <span>{this.getExposesSum()}</span> 円です
              </Discription>
            )
          }
        })()}
        <CalendarTable>
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
                          // const pattern = new RegExp('\\d{4}-\\d{2}-' + String(dd).padStart(2, '0'));
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
                                    <CalendarDate>{dd}</CalendarDate>
                                    {(() => {
                                      if (filteredRecords.length) {
                                        return (
                                          <ExposeADay>
                                            <span>
                                              {(() => {
                                                return filteredRecords.reduce((previous, current) => {
                                                  return previous + current.price
                                                }, 0)
                                              })()}
                                            </span>{' '}
                                            円
                                          </ExposeADay>
                                        )
                                      } else {
                                        return <i className={'fas fa-plus-circle fa-2x'} />
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
        </CalendarTable>
      </div>
    )
  }
}

const Caption = styled.div`
  text-align: center;
  margin-bottom: 20px;
  span {
    font-size: 40px;
    font-weight: bold;
    ${media.sp`font-size: 30px;`};
  }
`
const Discription = styled.p`
  text-align: center;
  span {
    font-size: 20px;
    font-weight: bold;
    ${media.sp`font-size: 18px;`};
  }
`
const CalendarTable = styled.table`
  width: 100%;
  margin-bottom: 40px;
  border-collapse: collapse;
  table-layout: fixed;
  th,
  td {
    text-align: center;
    width: 14.2857143%;
    box-sizing: border-box;
  }
  th {
    padding: 10px;
    font-weight: normal;
  }
  td {
    border: 1px solid #ccc;
    a {
      display: block;
      padding: 10px;
      height: 70px;
      position: relative;
      transition: opacity 0.3s;
      &:hover {
        opacity: 0.7;
      }
      ${media.sp`
        height: 50px;
        padding: 10px 0;
        text-align: center;
      `};
      i {
        padding-top: 20px;
        opacity: 0.2;
        ${media.sp`
          padding-top: 15px;
          transform: scale(0.6);
        `};
      }
    }
  }
  .sat,
  .sat a {
    color: #627aff;
  }
  .sun,
  .sun a,
  .holiday,
  .holiday a {
    color: #ff2043;
  }
  .today {
    background: #eee;
  }
`
const CalendarDate = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  ${media.pc`font-size: 14px;`};
  ${media.sp`font-size: 12px;`};
`
const ExposeADay = styled.div`
  padding-top: 24px;
  color: #767676;
  ${media.sp`font-size: 8px;`};
  span {
    font-weight: bold;
    ${media.pc`font-size: 20px;`};
    ${media.sp`font-size: 11px;`};
  }
`
