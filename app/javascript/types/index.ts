export interface Date {
  year: number
  month: number
  day: number
}

export interface Record {
  result: string
  done_on: string
}

export interface StoreState {
  date: Date
  record: Record
  records: Record[]
}
