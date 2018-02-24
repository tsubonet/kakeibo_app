import * as React from 'react'

export default class Budget extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleReserved = this.handleReserved.bind(this)
    this.handleReservedCancel = this.handleReservedCancel.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.handleEditToggle = this.handleEditToggle.bind(this)
    this.handleExtendToggle = this.handleExtendToggle.bind(this)
  }

  handleEdit(e) {
    e.preventDefault()
    let data = {}
    this.props.onEdit(this.props.device, data)
    this.setState({ isEdit: false })
  }

  handleExtend(e) {
    e.preventDefault()
    let data = {
      lock_version: this.props.device.lock_version,
    }
    this.props.onEdit(this.props.device, data)
    this.setState({ isExtend: false })
  }

  handleReturn(e) {
    e.preventDefault()
    let data = {}
    if (this.props.device.reserved_flag) {
      data = {
        use_flag: true,
        user_id: this.props.device.reserved_user_id,
        start_time: this.props.device.end_time,
        end_time: this.props.device.reserved_end_time,
        reserved_flag: false,
        reserved_user_id: null,
        reserved_end_time: null,
        lock_version: this.props.device.lock_version,
      }
    } else {
      data = {
        use_flag: false,
        user_id: null,
        start_time: null,
        end_time: null,
        lock_version: this.props.device.lock_version,
      }
    }
    this.props.onEdit(this.props.device, data)
  }

  handleReserved(e) {
    e.preventDefault()
    this.props.onOpenModal(this.props.device)
  }

  handleReservedCancel(e) {
    e.preventDefault()
    let data = {
      reserved_flag: false,
      reserved_user_id: null,
      reserved_end_time: null,
      lock_version: this.props.device.lock_version,
    }
    this.props.onEdit(this.props.device, data)
  }

  handleDelete(e) {
    e.preventDefault()
    if (!window.confirm('Are you sure?')) {
      return
    }
    this.props.onDelete(this.props.device)
  }

  handleChange(e) {
    this.props.onChange(this.props.device.id, e.target.checked)
  }

  handleEditToggle(e) {
    e.preventDefault()
    this.setState({ isEdit: !this.state.isEdit })
  }

  handleExtendToggle(e) {
    e.preventDefault()
    this.setState({ isExtend: !this.state.isExtend })
  }

  recordRow() {
    return (() => {
      if (true) {
        return <p>sss</p>
      }
    })()
  }

  recordEdit() {
    return (
      <tr>
        <td>
          <select className="form-control" defaultValue={this.props.device.category} ref="category">
            <option value="PC">PC</option>
            <option value="SP">SP</option>
            <option value="TABLET">TABLET</option>
          </select>
        </td>
        <td>
          <input type="text" className="form-control" defaultValue={this.props.device.device_id} ref="device_id" />
        </td>
        <td>
          <input type="text" className="form-control" defaultValue={this.props.device.name} ref="name" />／<input
            type="text"
            className="form-control"
            defaultValue={this.props.device.os}
            ref="os"
          />
        </td>
        <td>
          <input type="text" className="form-control" defaultValue={this.props.device.career} ref="career" />
        </td>
        <td />
        <td />
        <td />
        <td />
        <td>
          <button onClick={this.handleEdit} className="btn btn-primary">
            更新
          </button>{' '}
          <button onClick={this.handleEditToggle} className="btn btn-default">
            キャンセル
          </button>
        </td>
      </tr>
    )
  }

  render() {
    if (this.state.isEdit) {
      return this.recordEdit()
    } else {
      return this.recordRow()
    }
  }
}
