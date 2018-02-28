import * as React from 'react'
import { Record } from '../types/index'
import styled from 'styled-components'
import { media } from '../utils'

interface Props {
  sort: string
  price: number
  action?: string
  onUpdate?(data: any): void
  onCreate?(data: any): void
}
interface State {
  sort: string
  price: number
  sortCustom: string
}

export default class InputExpense extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      sort: props.sort,
      price: props.price,
      sortCustom: '',
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleCreate(e) {
    e.preventDefault()
    const { onCreate } = this.props
    const { sort, sortCustom, price } = this.state
    const tempSort = sort === '項目を入力する' ? sortCustom : sort
    const data = {
      sort: tempSort,
      price,
    }
    onCreate(data)
    this.setState({
      sort: '食費',
      price: 0,
    })
  }

  handleUpdate(e) {
    e.preventDefault()
    const { onUpdate } = this.props
    const { sort, sortCustom, price } = this.state
    const tempSort = sort === '項目を入力する' ? sortCustom : sort
    const data = {
      sort: tempSort,
      price,
    }
    onUpdate(data)
  }

  render() {
    const { action } = this.props
    const { sort, price, sortCustom } = this.state
    return (
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
        <td>
          {(() => {
            if (action === 'update') {
              return <button onClick={this.handleUpdate}>更新</button>
            } else {
              return <button onClick={this.handleCreate}>登録</button>
            }
          })()}
        </td>
      </tr>
    )
  }
}
