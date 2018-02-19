import * as React from 'react'
import Link from '../components/link'
import { sendPost, sendPatch } from '../utils'

export default class PageDay extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      isEdit: false,
    }
    this.selectResult = this.selectResult.bind(this)
    this.deleteResult = this.deleteResult.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
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
            <i className="fas fa-hand-point-down" /> この日の結果は...
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
        {(() => {
          if (record === null || isEdit === true) {
            return (
              <dl>
                <dt>
                  <i className="fas fa-hand-point-down" /> 結果を選択する
                </dt>
                <dd>
                  <ul>
                    <li>
                      <a
                        onClick={this.selectResult}
                        className={record !== null && record.result === 'good' ? 'isSelected' : ''}
                        data-result="good"
                      >
                        <span>完璧！</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={this.selectResult}
                        className={record !== null && record.result === 'limited' ? 'isSelected' : ''}
                        data-result="limited"
                      >
                        <span>半分くらいできた</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={this.selectResult}
                        className={record !== null && record.result === 'wakeup' ? 'isSelected' : ''}
                        data-result="wakeup"
                      >
                        <span>起きただけ</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={this.selectResult}
                        className={record !== null && record.result === 'bad' ? 'isSelected' : ''}
                        data-result="bad"
                      >
                        <span>起きれなかった</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={this.selectResult}
                        className={record !== null && record.result === 'bad' ? 'isSelected' : ''}
                        data-result="sick"
                      >
                        <span>体調不良</span>
                      </a>
                    </li>
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
