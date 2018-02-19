import { connect } from 'react-redux'
import PageYear from '../components/page_year'

const mapStateToProps = state => {
  return {
    date: state.date,
    records: state.records,
  }
}

const PageYearContainer = connect(mapStateToProps)(PageYear)

export default PageYearContainer
