import * as React from 'react'
import { Record } from '../types/index'

interface Props {
  record: Record
  onDelete(record: Record): void
}
interface State {
  isEdit: boolean
}

export default class RecordItem extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleDelete(e) {
    const { record, onDelete } = this.props
    e.preventDefault()
    onDelete(record)
  }

  handleUpdate() {}

  render() {
    const { record } = this.props
    if (record === null) {
      return
    }
    return (
      <tr>
        <td>{record.sort}</td>
        <td>{record.price}円</td>
        <td>
          <button onClick={this.handleUpdate}>編集</button>
          <button onClick={this.handleDelete}>削除</button>
        </td>
      </tr>
    )
  }
}
