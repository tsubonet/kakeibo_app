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
      isEdit: false,
    }
    this.selectResult = this.selectResult.bind(this)
    this.deleteResult = this.deleteResult.bind(this)
    this.addInputForm = this.addInputForm.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  addInputForm(e) {
    e.preventDefault()
    alert('a')
  }

  selectResult(e) {
    e.preventDefault()
    const result = e.currentTarget.getAttribute('data-result')
    if (this.state.record !== null) {
      this.props.patchRecord(this.state.record, result)
    } else {
      this.props.postRecord(this.state.date, result)
    }
  }

  deleteResult(e) {
    e.preventDefault()
    this.props.deleteRecord(this.state.record)
  }

  getDay() {
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
                return (
                  <div className={'result-image ' + record.result}>
                    <div>
                      <a onClick={this.deleteResult} className="delete-trigger">
                        <i className="fas fa-trash-alt fa-2x" />
                      </a>
                    </div>
                  </div>
                )
              } else {
                return <div className="record-empty">まだ記入がありません</div>
              }
            })()}
          </dd>
        </dl>

        <button onClick={this.addInputForm}>
          <i className="fas fa-hand-point-down" /> 出費を登録する
        </button>

        {(() => {
          if (record === null || isEdit === true) {
            return (
              <dl>
                <dt>
                  <i className="fas fa-hand-point-down" /> 出費を登録する
                </dt>
                <dd>
                  <ul>
                    <li />
                  </ul>
                </dd>
              </dl>
            )
          } else {
            return (
              <div style={{ marginBottom: '10px' }}>
                <a
                  href="javascript:;"
                  onClick={() => {
                    this.setState({ isEdit: true })
                  }}
                  className="edit-trigger"
                >
                  <i className="fas fa-angle-left" /> 結果を修正する
                </a>
              </div>
            )
          }
        })()}
        <Link href={`/month/${date.year}/${date.month}`}>
          <i className="fas fa-angle-left" /> カレンダーにもどる
        </Link>
      </div>
    )
  }
}
