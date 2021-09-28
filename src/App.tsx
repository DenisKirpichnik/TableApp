import React from 'react'
import './styles/styles.css'
import { Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from './state/store'
import Table from './pages/Table'

import History from './components/History'
import { DialogContainer } from './context/DialogContainer'

const store = configureStore()

export const App = () => {
  return (
    <DialogContainer>
      <Provider store={store}>
        <Router history={History}>
          <Switch>
            <Route path="/">
              <Table />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </DialogContainer>
  )
}
