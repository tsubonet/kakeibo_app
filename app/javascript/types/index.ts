export interface Date {
  year: number
  month: number
  day: number
}

export interface Record {
  id: number
  sort: string
  price: number
  done_on: string
}

export interface RecordData {
  sort?: string
  price?: number | string
  done_on?: string
}

export interface StoreState {
  auth: object
  date: Date
  records: Record[]
  recordsYear: Record[][]
}
