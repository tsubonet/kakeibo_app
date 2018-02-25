import * as React from 'react'

export default class Budget extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
    }
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleEdit(e) {
    e.preventDefault()
    let data = {}
    this.props.onEdit(this.props.device, data)
    this.setState({ isEdit: false })
  }

  recordRow() {
    return (() => {
      if (true) {
        return <p>sss</p>
      }
    })()
  }

  recordEdit() {
    return <p>a</p>
  }

  render() {
    if (this.state.isEdit) {
      return this.recordEdit()
    } else {
      return this.recordRow()
    }
  }
}
