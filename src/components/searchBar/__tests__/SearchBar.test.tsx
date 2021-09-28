import React from 'react'
import { render } from '@testing-library/react'
import SearchBar from '../SearchBar'

import { Route, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const history = createMemoryHistory()

describe('Search Bar tests', () => {
  test('Should render Search Bar', () => {
    const { getByTestId } = render(
      <Router history={history}>
        <Route path="/">
          <SearchBar history={history} />
        </Route>
      </Router>
    )
    expect(getByTestId('searchBar-wrapper')).toBeInTheDocument()
  })
})
