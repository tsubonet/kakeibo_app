import * as React from 'react'
import { Record } from '../types/index'

interface Props {
  record: Record
  onDelete(record: Record): void
  onUpdate(record: Record, data: any): void
}
interface State {
  isEdit: boolean
  sort: string
  sortCustom: string
  price: number
}

export default class RecordItem extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      sort: props.record.sort,
      price: props.record.price,
      sortCustom: '',
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }
  handleEdit(e) {
    e.preventDefault()
    this.setState({ isEdit: !this.state.isEdit })
  }

  handleDelete(e) {
    const { record, onDelete } = this.props
    e.preventDefault()
    onDelete(record)
  }

  handleUpdate(e) {
    e.preventDefault()
    const { record, onUpdate } = this.props
    const { sort, sortCustom, price } = this.state
    const tempSort = sort === '項目を入力する' ? sortCustom : sort
    const data = {
      sort: tempSort,
      price,
    }
    onUpdate(record, data)
    this.setState({ isEdit: false })
  }

  render() {
    const { isEdit, sort, price } = this.state
    if (isEdit) {
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
            <button onClick={this.handleUpdate}>更新</button>
          </td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td>{sort}</td>
          <td>{price}円</td>
          <td>
            <button onClick={this.handleEdit}>編集</button>
            <button onClick={this.handleDelete}>削除</button>
          </td>
        </tr>
      )
    }
  }
}
