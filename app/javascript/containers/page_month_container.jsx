import { connect } from 'react-redux'
import PageMonth from '../components/page_month'

const mapStateToProps = state => {
  return {
    date: state.date,
    records: state.records,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const PageMonthContainer = connect(mapStateToProps, mapDispatchToProps)(PageMonth)

export default PageMonthContainer
