import { connect } from 'react-redux'
import PageYear from '../components/page_year'
import { StoreState } from '../types/index'

const mapStateToProps = ({ date, recordsYear, budgetsYear }: StoreState) => {
  return {
    date,
    recordsYear,
    budgetsYear,
  }
}

const PageYearContainer = connect(mapStateToProps)(PageYear)

export default PageYearContainer
