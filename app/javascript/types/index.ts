export interface Date {
  year: number
  month: number
  day: number
}

export interface Record {
  sort: string
  price: any // numberにするとdefalutValueエラー...
  done_on: string
}

export interface StoreState {
  date: Date
  records: Record[]
  recordsYear: Record[][]
}
