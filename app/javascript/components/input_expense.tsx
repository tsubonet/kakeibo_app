import * as React from 'react'
import { Record } from '../types/index'
import styled from 'styled-components'
import { media } from '../utils'

interface Props {
  sort: string
  price?: number | string
  action?: string
  onUpdate?(data: any): void
  onCreate?(data: any): void
}
interface State {
  sort: string
  price?: number | string
  sortCustom: string
}

export default class InputExpense extends React.Component<Props, State> {
  private sortCustomRef: HTMLInputElement
  constructor(props) {
    super(props)
    this.state = {
      sort: props.sort,
      price: props.price,
      sortCustom: '',
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleCreate(e) {
    e.preventDefault()
    const { onCreate } = this.props
    const { sort, sortCustom, price } = this.state
    const tempSort = sort === '項目を入力する' ? sortCustom : sort
    if (tempSort === '' || price === '' || price === NaN) {
      confirm('未入力の項目があります。')
      return
    }
    const data = {
      sort: tempSort,
      price,
    }
    onCreate(data)
    this.setState({
      sort: '食費',
      price: '',
    })
  }

  handleUpdate(e) {
    e.preventDefault()
    const { onUpdate } = this.props
    const { sort, sortCustom, price } = this.state
    const tempSort = sort === '項目を入力する' ? sortCustom : sort
    if (tempSort === '' || price === '' || price === NaN) {
      confirm('未入力の項目があります。')
      return
    }
    const data = {
      sort: tempSort,
      price,
    }
    onUpdate(data)
  }

  render() {
    const { action } = this.props
    const { sort, price, sortCustom } = this.state
    return (
      <tr>
        <td>
          <SelectSortWrapper>
            <SelectSort
              value={sort}
              onChange={e => {
                this.setState({ sort: e.target.value })
              }}
            >
              <option value="食費">食費</option>
              <option value="外食費">外食費</option>
              <option value="雑費">雑費</option>
              <option value="子供用品">子供用品</option>
              <option value="その他">その他</option>
              <option value="項目を入力する">項目を入力する</option>
            </SelectSort>
          </SelectSortWrapper>
          {(() => {
            if (sort === '項目を入力する') {
              return (
                <div>
                  <InputSortCustom
                    type="text"
                    placeholder="項目を入力"
                    value={sortCustom}
                    innerRef={(input: HTMLInputElement) => {
                      if (window.window.matchMedia('screen and (min-width: 768px)')) {
                        return input && input.focus()
                      }
                    }}
                    onChange={e => {
                      this.setState({ sortCustom: e.target.value })
                    }}
                  />
                </div>
              )
            }
          })()}
        </td>
        <td>
          <InputPrice
            type="number"
            placeholder="1000"
            value={price}
            onChange={e => {
              this.setState({ price: parseInt(e.target.value) })
            }}
          />{' '}
          円
        </td>
        <td>
          {(() => {
            if (action === 'update') {
              return <Button onClick={this.handleUpdate}>更新</Button>
            } else {
              return <Button onClick={this.handleCreate}>登録</Button>
            }
          })()}
        </td>
      </tr>
    )
  }
}

const SelectSortWrapper = styled.div`
  position: relative;
  background: #fff;
  &::before {
    position: absolute;
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-bottom: 3px solid #ccc;
    border-left: 3px solid #ccc;
    transform: rotate(-45deg);
    z-index: 1;
    right: 10px;
    top: 14px;
  }
`
const SelectSort = styled.select`
  -webkit-appearance: none;
  background: transparent;
  position: relative;
  z-index: 2;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px 10px 10px;
  width: 100%;
  font-size: 16px;
`
const InputSortCustom = styled.input`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
`
const InputPrice = styled.input`
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
  ${media.pc`width: 100px;`};
  ${media.sp`width: 78%;`};
`
const Button = styled.button`
  background: none;
  border-radius: 3px;
  background: rgba(191, 255, 182, 0.3);
  ${media.pc`padding: 10px 20px;`};
  ${media.sp`padding: 10px 10px;`};
`
