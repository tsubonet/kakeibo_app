import { connect } from 'react-redux'
import { postRecord, patchRecord, deleteRecord } from '../actions/records'
import PageDay from '../components/page_day'
import { StoreState, Record, RecordData } from '../types/index'

const mapStateToProps = ({ auth, date, records }: StoreState) => {
  return {
    date,
    records,
    auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postRecord: (auth, data: Record) => {
      dispatch(postRecord(auth, data))
    },
    patchRecord: (auth, record: Record, data: Record) => {
      dispatch(patchRecord(auth, record, data))
    },
    deleteRecord: (auth, record: Record) => {
      dispatch(deleteRecord(auth, record))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageDay)
