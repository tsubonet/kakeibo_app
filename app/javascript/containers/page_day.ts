import { connect } from 'react-redux'
import { postRecord, patchRecord, deleteRecord } from '../actions/records'
import PageDay from '../components/page_day'
import { Auth, StoreState, Record, RecordData } from '../types/index'

const mapStateToProps = ({ auth, date, records }: StoreState) => {
  return {
    date,
    records,
    auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postRecord: (auth: Auth, data: Record) => {
      dispatch(postRecord(auth, data))
    },
    patchRecord: (auth: Auth, record: Record, data: Record) => {
      dispatch(patchRecord(auth, record, data))
    },
    deleteRecord: (auth: Auth, record: Record) => {
      dispatch(deleteRecord(auth, record))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageDay)
