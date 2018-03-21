import { connect } from 'react-redux'
import { fetchRootProps } from '../actions/common'
import Router from '../components/router'
import { withRouter } from 'react-router'

const mapStateToProps = state => {
  return { ...state }
}

const mapDispatchToProps = dispatch => {
  return {
    transitTo: (url, pushState, history, auth) => {
      dispatch(fetchRootProps(url, pushState, history, auth))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Router))
