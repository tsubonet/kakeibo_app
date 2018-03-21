import * as React from 'react'
import InputExpense from '../components/input_expense'
import { Record, RecordData } from '../types/index'
import styled from 'styled-components'
import { media } from '../utils'

interface Props {
  auth: object
  record: Record
  onDelete(auth, record: Record): void
  onUpdate(auth, record: Record, data: RecordData): void
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
    this.handleEdit = this.handleEdit.bind(this)
  }
  handleEdit(e) {
    e.preventDefault()
    this.setState({ isEdit: !this.state.isEdit })
  }

  handleDelete(e) {
    e.preventDefault()
    const { auth, record, onDelete } = this.props
    onDelete(auth, record)
  }

  handleUpdate(data: RecordData) {
    const { auth, record, onUpdate } = this.props
    onUpdate(auth, record, data)
    this.setState({
      isEdit: false,
    })
  }

  render() {
    const { isEdit } = this.state
    const { record } = this.props
    if (isEdit) {
      return <InputExpense record={record} onUpdate={this.handleUpdate} />
    } else {
      return (
        <tr>
          <td>{record.sort}</td>
          <td>{record.price}円</td>
          <td>
            <Button onClick={this.handleEdit}>
              <i className="fas fa-edit fa-2x" />
            </Button>
            <Button onClick={this.handleDelete}>
              <i className="fas fa-trash-alt fa-2x" />
            </Button>
          </td>
        </tr>
      )
    }
  }
}

const Button = styled.a`
  display: inline-block;
  ${media.pc`
    &:first-child {margin-right: 10px;}
  `};
  ${media.sp`
    &:first-child {margin-right: 5px;}
  `};
  i {
    transform: scale(0.8);
  }
`
