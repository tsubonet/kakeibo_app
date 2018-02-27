import * as React from 'react'
import { Record } from '../types/index'

interface Props {
  record: Record
  onDelete(record: Record): void
  onUpdate(record: Record, data: any): void
}
interface State {
  isEdit: boolean
}

export default class RecordItem extends React.Component<Props, State> {
  private sortVal: HTMLSelectElement
  private priceVal: HTMLInputElement

  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
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
    const data = {
      sort: this.sortVal.value,
      price: this.priceVal.value,
    }
    onUpdate(record, data)
    this.setState({ isEdit: false })
  }

  render() {
    const { record } = this.props
    const { isEdit } = this.state
    if (isEdit) {
      return (
        <tr>
          <td>
            <select
              ref={(input: HTMLSelectElement) => {
                this.sortVal = input
              }}
              defaultValue={record.sort}
            >
              <option value="食費">食費</option>
              <option value="外食費">外食費</option>
              <option value="雑費">雑費</option>
              <option value="子供関係">子供関係</option>
              <option value="その他">その他</option>
            </select>
          </td>
          <td>
            <input
              type="number"
              defaultValue={record.price}
              ref={(input: HTMLInputElement) => {
                this.priceVal = input
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
          <td>{record.sort}</td>
          <td>{record.price}円</td>
          <td>
            <button onClick={this.handleEdit}>編集</button>
            <button onClick={this.handleDelete}>削除</button>
          </td>
        </tr>
      )
    }
  }
}
