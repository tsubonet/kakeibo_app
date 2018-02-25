import * as React from 'react'
import { Record } from '../types/index'

interface Props {
  record: Record
}
interface State {
  record: Record
}

export default class RecordItem extends React.Component<Props, State> {
  constructor(props) {
    super(props)
  }

  render() {
    const { record } = this.props
    if (record === null) {
      return
    }
    return (
      <tr>
        <td>{record.sort}</td>
        <td>{record.price}円</td>
        <td />
      </tr>
    )
  }
}
