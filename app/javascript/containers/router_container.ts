import { connect } from 'react-redux'
import { fetchRootProps } from '../actions/records'
import Router from '../components/router'
import { withRouter } from 'react-router'

const mapStateToProps = state => {
  return { ...state }
}

const mapDispatchToProps = dispatch => {
  return {
    transitTo: (url, pushState, callback) => {
      dispatch(fetchRootProps(url, pushState, callback))
    },
  }
}

const RouterContainer = connect(mapStateToProps, mapDispatchToProps)(Router)

export default withRouter(RouterContainer)
