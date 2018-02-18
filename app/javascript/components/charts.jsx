import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'

export default class Charts extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  render() {
    let limitedCount = 0,
      goodCount = 0,
      wakeupCount = 0,
      badCount = 0,
      sickCount = 0
    this.state.records.forEach(record => {
      switch (record.result) {
        case 'limited':
          limitedCount++
          break
        case 'good':
          goodCount++
          break
        case 'wakeup':
          wakeupCount++
          break
        case 'bad':
          badCount++
          break
        case 'sick':
          sickCount++
          break
      }
    })
    const data = [
      { name: '完璧！', value: goodCount },
      { name: '半分くらいできた', value: limitedCount },
      { name: '起きただけ', value: wakeupCount },
      { name: '起きれなかった', value: badCount },
      { name: '体調不良', value: sickCount },
    ]
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
          if (this.state.records.length) {
            return (
              <div style={containerStyle}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={data} dataKey="value" startAngle={90} endAngle={-270}>
                      {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
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
