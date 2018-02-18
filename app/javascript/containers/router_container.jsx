import { connect } from 'react-redux'
import { fetchRootProps } from '../actions/records'
import Router from '../components/router'

const mapStateToProps = state => {
  return { ...state }
}

const mapDispatchToProps = dispatch => {
  return {
    transitTo: (url, pushState) => {
      dispatch(fetchRootProps(url, pushState))
    },
  }
}

const RouterContainer = connect(mapStateToProps, mapDispatchToProps)(Router)

export default RouterContainer
