import { connect } from 'react-redux'
import PageYear from '../components/page_year'
import { StoreState } from '../types/index'

const mapStateToProps = ({ date, records }: StoreState) => {
  return {
    date,
    records,
  }
}

const PageYearContainer = connect(mapStateToProps)(PageYear)

export default PageYearContainer
