import { connect } from 'react-redux'
import PageMonth from '../components/page_month'
import { StoreState } from '../types/index'

const mapStateToProps = ({ date, records }: StoreState) => {
  return {
    date,
    records,
  }
}

const PageMonthContainer = connect(mapStateToProps)(PageMonth)

export default PageMonthContainer
