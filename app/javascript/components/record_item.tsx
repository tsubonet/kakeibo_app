import * as React from 'react'
import InputExpense from '../components/input_expense'
import { Record } from '../types/index'
import styled from 'styled-components'
import { media } from '../utils'

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
