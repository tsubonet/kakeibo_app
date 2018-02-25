import { connect } from 'react-redux'
import { postRecord, patchRecord, deleteRecord } from '../actions/records'
import PageDay from '../components/page_day'
import { StoreState } from '../types/index'

const mapStateToProps = ({ date, records }: StoreState) => {
  return {
    date,
    records,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postRecord: data => {
      dispatch(postRecord(data))
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
