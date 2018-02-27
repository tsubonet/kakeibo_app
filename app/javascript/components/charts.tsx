import * as React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import { Date, Record } from '../types/index'

interface Props {
  records: Record[]
}

export default class Charts extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { records } = this.props

    const data = records.reduce((result, current) => {
      const element = result.find(p => p.name === current.sort)
      if (element) {
        element.count++ // count
        element.value += current.price // sum
      } else {
        result.push({
          name: current.sort,
          count: 1,
          value: current.price,
        })
      }
      return result
    }, [])

    // const data = records.reduce((result, current) => {
    //   const element = result.find(p => p.sort === current.sort)
    //   if (element) {
    //     element.count++ // count
    //     element.price += current.price // sum
    //   } else {
    //     result.push({
    //       sort: current.sort,
    //       count: 1,
    //       price: current.price,
    //     })
    //   }
    //   return result
    // }, [])

    const containerStyle = {
      WebkitBoxSizing: 'border-box',
      boxSizing: 'border-box',
      padding: '8px',
      width: '80%',
      height: '330px',
      maxHeight: '330px',
      margin: '0 auto',
    }
    const COLORS = ['#E2A27D', '#cf73c3', '#cccccc', '#000000', '#FFB6C1']
    return (
      <div>
        {(() => {
          if (records.length) {
            return (
              <div style={containerStyle}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={data} dataKey="value" startAngle={90} endAngle={-270}>
                      {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip payload={[{ unit: '円' }]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )
          } else {
            return null
          }
        })()}
      </div>
    )
  }
}
