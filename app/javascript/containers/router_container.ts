import { connect } from 'react-redux'
import { fetchRootProps } from '../actions/records'
import Router from '../components/router'
import { withRouter } from 'react-router'

const mapStateToProps = state => {
  return { ...state }
}

const mapDispatchToProps = dispatch => {
  return {
    transitTo: (url, pushState, history) => {
      dispatch(fetchRootProps(url, pushState, history))
    },
  }
}

const RouterContainer = connect(mapStateToProps, mapDispatchToProps)(Router)

export default withRouter(RouterContainer)
