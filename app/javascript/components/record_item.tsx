import * as React from 'react'
import { Record } from '../types/index'
import InputExpense from './input_expense'

interface Props {
  record: Record
  onDelete(record: Record): void
  onUpdate(record: Record, data: any): void
}
interface State {
  isEdit: boolean
  sort: string
  price: number
}

export default class RecordItem extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      sort: props.record.sort,
      price: props.record.price,
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
    e.preventDefault()
    const { record, onDelete } = this.props
    onDelete(record)
  }

  handleUpdate(data) {
    const { record, onUpdate } = this.props
    onUpdate(record, data)
    this.setState({
      isEdit: false,
      sort: data.sort,
      price: data.price,
    })
  }

  render() {
    const { isEdit, sort, price } = this.state
    if (isEdit) {
      return <InputExpense action="update" sort={sort} price={price} onUpdate={this.handleUpdate} />
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
