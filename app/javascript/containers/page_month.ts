import { connect } from 'react-redux'
import PageMonth from '../components/page_month'
import { StoreState } from '../types/index'

const mapStateToProps = ({ date, records }: StoreState) => {
  return {
    date,
    records,
  }
}

export default connect(mapStateToProps)(PageMonth)
