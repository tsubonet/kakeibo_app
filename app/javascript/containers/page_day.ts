import { connect } from 'react-redux'
import { postRecord, patchRecord, deleteRecord } from '../actions/records'
import PageDay from '../components/page_day'
import { StoreState, Record, RecordData } from '../types/index'

const mapStateToProps = ({ date, records }: StoreState) => {
  return {
    date,
    records,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postRecord: (data: Record) => {
      dispatch(postRecord(data))
    },
    patchRecord: (record: Record, data: Record) => {
      dispatch(patchRecord(record, data))
    },
    deleteRecord: (record: Record) => {
      dispatch(deleteRecord(record))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageDay)
