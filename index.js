import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './js/containers/App'
import configureStore from './js/store/configureStore'

const store = configureStore()

render (
  <Provider store={store}>
    <App> </App>
  </Provider>, document.getElementById('craigslist-container')
)
