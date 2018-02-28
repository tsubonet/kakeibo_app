import * as React from 'react'
import Link from '../components/link'
import Calendar from '../components/calendar'
import Charts from '../components/charts'
import { Date, Record } from '../types/index'
import styled from 'styled-components'

interface Props {
  date: Date
  records: Record[]
}
export default class PageMonth extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  prevCalendar(): string {
    const { date } = this.props
    if (date.month === 1) {
      return `/month/${date.year - 1}/12`
    } else {
      return `/month/${date.year}/${date.month - 1}`
    }
  }

  nextCalendar(): string {
    const { date } = this.props
    if (date.month === 12) {
      return `/month/${date.year + 1}/1`
    } else {
      return `/month/${date.year}/${date.month + 1}`
    }
  }

  render() {
    const { date } = this.props
    return (
      <div>
        <nav>
          <ControllNav>
            <li>
              <Link href={this.prevCalendar()}>
                <i className="fas fa-angle-left fa-2x" />
              </Link>
            </li>
            <li>
              <Link href={this.nextCalendar()}>
                <i className="fas fa-angle-right fa-2x" />
              </Link>
            </li>
            <li>
              <Link href="/" data-type="btn">
                今月
              </Link>
            </li>
            <li>
              <Link href={`/year/${date.year}`} data-type="btn">
                {date.year}年一覧
              </Link>
            </li>
          </ControllNav>
        </nav>
        <Calendar {...this.props} />
        <Charts {...this.props} />
      </div>
    )
  }
}

const ControllNav = styled.ul`
  padding: 0;
  text-align: right;
  li {
    list-style: none;
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
    a[data-type='btn'] {
      background: #f5f5f5;
      padding: 10px 10px;
      transition: background 0.3s;
      &:hover {
        background: #ccc;
      }
    }
  }
`
