import { connect } from 'react-redux'
import { fetchRootProps } from '../actions/common'
import Router from '../components/router'
import { withRouter } from 'react-router'

const mapStateToProps = state => {
  return { ...state }
}

const mapDispatchToProps = dispatch => {
  return {
    transitTo: (auth, url, history) => {
      dispatch(fetchRootProps(auth, url, history))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Router))
