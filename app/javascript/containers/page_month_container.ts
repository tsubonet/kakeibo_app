import { connect } from 'react-redux'
import PageMonth from '../components/page_month'

const mapStateToProps = state => {
  return {
    date: state.date,
    records: state.records,
  }
}

const PageMonthContainer = connect(mapStateToProps)(PageMonth)

export default PageMonthContainer
