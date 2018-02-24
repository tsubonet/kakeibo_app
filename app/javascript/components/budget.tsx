import * as React from 'react'

export default class DeviceListItem extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleExtend = this.handleExtend.bind(this)
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
    let formatted_end_time = this.props.device.end_time !== null ? null : null
    let formatted_reserved_end_time = this.props.device.reserved_end_time !== null ? null : null
    let checked = this.props.selected ? true : false
    let bgColor =
      this.props.device.end_time !== null && new Date(this.props.device.end_time).getTime() < new Date().getTime()
        ? 'danger'
        : null
    return (
      <tr className={bgColor}>
        <td>{this.props.device.category}</td>
        <td>{this.props.device.device_id}</td>
        <td>
          {this.props.device.name}／{this.props.device.os}
        </td>
        <td>{this.props.device.career}</td>
        <td>{this.props.device.use_flag ? '貸出中' : '利用可'}</td>
        <td>
          {this.props.device.use_flag ? null : <input type="checkbox" onChange={this.handleChange} checked={checked} />}
        </td>
        <td>{this.props.device.use_flag ? this.props.user.username + 'さん' : null}</td>
        <td>{this.props.device.use_flag ? formatted_end_time : null}</td>
        <td>
          {(() => {
            if (!this.props.device.use_flag && this.props.currentUser.admin && !checked && this.props.adminMode) {
              return (
                <div>
                  <button onClick={this.handleEditToggle} className="btn btn-default">
                    編集
                  </button>{' '}
                  <button onClick={this.handleDelete} className="btn btn-danger">
                    削除
                  </button>
                </div>
              )
            }
          })()}
          {(() => {
            if (this.props.device.use_flag && this.props.device.user_id == this.props.currentUser.id) {
              return (
                <button onClick={this.handleReturn} className="btn btn-danger">
                  返却
                </button>
              )
            }
          })()}{' '}
          {(() => {
            if (
              this.props.device.use_flag &&
              this.props.device.user_id == this.props.currentUser.id &&
              !this.props.device.reserved_flag
            ) {
              return (
                <button onClick={this.handleExtendToggle} className="btn btn-default">
                  延長
                </button>
              )
            }
          })()}
          {(() => {
            if (this.props.device.use_flag && this.props.device.user_id != this.props.currentUser.id) {
              if (!this.props.device.reserved_flag) {
                return (
                  <button onClick={this.handleReserved} className="btn btn-primary">
                    予約
                  </button>
                )
              } else if (
                this.props.device.reserved_flag &&
                this.props.device.reserved_user_id == this.props.currentUser.id
              ) {
                return (
                  <button onClick={this.handleReservedCancel} className="btn btn-default">
                    予約取消
                  </button>
                )
              }
            }
          })()}
          {(() => {
            if (this.props.device.reserved_flag) {
              return (
                <div>
                  <span className="glyphicon glyphicon-exclamation-sign" /> {this.props.reservedUser.username}さんが予約中({
                    formatted_reserved_end_time
                  }まで利用予定)<br />
                  <small>{formatted_end_time}から予約可能</small>
                </div>
              )
            }
          })()}
        </td>
      </tr>
    )
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
