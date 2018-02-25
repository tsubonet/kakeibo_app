import * as React from 'react'

export default class BudgetItem extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
    }
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleEdit(e) {
    e.preventDefault()
    this.setState({ isEdit: true })
  }

  recordRow() {
    return (() => {
      if (this.state.budget !== undefined) {
        return (
          <div>
            <p>{this.state.budget}円</p>
            <button onClick={this.handleEdit}>修正</button>
          </div>
        )
      } else {
        return (
          <div>
            <p>まだ登録されてません</p>
            <button onClick={this.handleEdit}>登録</button>
          </div>
        )
      }
    })()
  }

  recordEdit() {
    return (
      <p>
        <input type="text" defaultValue="0" />円
      </p>
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
