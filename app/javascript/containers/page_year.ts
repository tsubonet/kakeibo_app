import { connect } from 'react-redux'
import PageYear from '../components/page_year'
import { StoreState } from '../types/index'

const mapStateToProps = ({ date, recordsYear }: StoreState) => {
  return {
    date,
    recordsYear,
  }
}

export default connect(mapStateToProps)(PageYear)
