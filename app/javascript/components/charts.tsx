import * as React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import { Record } from '../types/index'
import styled from 'styled-components'

interface Props {
  records: Record[]
}

const Charts = ({ records }: Props) => {
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
  const COLORS = ['#E2A27D', '#cf73c3', '#cccccc', '#000000', '#FFB6C1']
  return (
    <div>
      {(() => {
        if (records.length) {
          return (
            <ChartsWrapper>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={data} dataKey="value" startAngle={90} endAngle={-270}>
                    {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip payload={[{ unit: '円' }]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartsWrapper>
          )
        } else {
          return null
        }
      })()}
    </div>
  )
}

const ChartsWrapper = styled.div`
    box-sizing: border-box;
    padding: 8px;
    width: 80%;
    height: 330px;
    max-height: 330px;
    margin: 0 auto;
  }
`
export default Charts
