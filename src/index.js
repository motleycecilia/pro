import 'styles/index.less'
import React from 'react'
import { render } from 'react-dom'
import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './store/configureStore'
import Root from './containers/root'

const store = configureStore()
const history = useRouterHistory(createHashHistory)({ queryKey: false })

injectTapEventPlugin()
syncHistoryWithStore(history, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
