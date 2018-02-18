import { connect } from 'react-redux'
import { postRecord, patchRecord, deleteRecord } from '../actions/records'
import PageDay from '../components/page_day'

const mapStateToProps = state => {
  return {
    date: state.date,
    record: state.record,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postRecord: (date, result) => {
      dispatch(postRecord(date, result))
    },
    patchRecord: (record, result) => {
      dispatch(patchRecord(record, result))
    },
    deleteRecord: record => {
      dispatch(deleteRecord(record))
    },
  }
}

const PageDayContainer = connect(mapStateToProps, mapDispatchToProps)(PageDay)

export default PageDayContainer
