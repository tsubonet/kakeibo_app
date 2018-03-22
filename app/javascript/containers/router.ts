import { connect } from 'react-redux'
import { fetchRootProps } from '../actions/common'
import Router from '../components/router'
import { withRouter } from 'react-router'
import { Auth, StoreState } from '../types/index'

const mapStateToProps = (state: StoreState) => {
  return { ...state }
}

const mapDispatchToProps = dispatch => {
  return {
    transitTo: (url: string, auth: Auth, history: object) => {
      dispatch(fetchRootProps(auth, url, history))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Router))
