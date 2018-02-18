import React from 'react'
import ReactOnRails from 'react-on-rails'
import { Provider } from 'react-redux'
import RouterContainer from '../containers/router_container'
import configureStore from '../store'

const App = (props, railsContext) => {
  const store = configureStore(props)
  return (
    <Provider store={store}>
      <RouterContainer />
    </Provider>
  )
}

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
})
