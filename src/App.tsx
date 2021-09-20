import React from 'react'
import './styles/styles.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './state/store'
import { Table } from './pages/Table'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/">
            <Table />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}
