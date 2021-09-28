import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productReducers } from './products/productReducers'
import { state as productState } from './products/state'

const createReducer = (initialState = {}, reducers: any) => {
  console.log('initialState', initialState)
  return (state = initialState, action: any) => {
    const reducerFn = reducers[action.type]
    return reducerFn ? reducerFn(state, action) : state
  }
}

export const configureStore = () => {
  return createStore(
    combineReducers({
      product: createReducer(productState, productReducers)
    }),
    composeWithDevTools(applyMiddleware(thunk))
  )
}
