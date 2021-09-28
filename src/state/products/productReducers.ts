import { Reducer } from 'redux'
import { actions } from './actionTypes'
import { state as initialState } from './state'
import { Product } from '../../interfaces/interfaces'
import { RootState } from '../store'

export interface Action<T, P> {
  type: T
  payload?: P
}

interface Reducers {
  [actions.GET_PRODUCTS]: Reducer<RootState, Action<string, { products: Product[] }>>
  [actions.SET_CURRENT_PRODUCT]: Reducer<RootState, Action<string, number>>
  [actions.EDIT_PRODUCT]: Reducer<RootState, Action<string, Product>>
  [actions.ADD_NEW_PRODUCT]: Reducer<RootState, Action<string, Product>>
  [actions.DELETE_PRODUCT]: Reducer<RootState, Action<string, number>>
  [actions.SEARCH_PRODUCT]: Reducer<RootState, Action<string, string>>
  [actions.SORT_PRODUCTS]: Reducer<
    RootState,
    Action<string, { isAscending: boolean; parameter: 'count' | 'string' }>
  >
}

export const productReducers: Reducers = {
  [actions.GET_PRODUCTS]: (state, { payload }) => {
    if (payload) {
      return {
        ...state,
        products: payload
      }
    }
    return initialState
  },
  [actions.SET_CURRENT_PRODUCT]: (state, { payload }) => {
    if (!payload) {
      return {
        ...state,
        currentProduct: null
      }
    }
    if (payload) {
      console.log(payload)
      return {
        ...state,
        currentProduct: state.products.filter(({ id }: { id: number }) => id === payload)
      }
    }
    return initialState
  },

  [actions.EDIT_PRODUCT]: (state, { payload }) => {
    if (payload) {
      return {
        ...state,
        products: state.products.map((product: Product) =>
          product.id === payload.id ? payload : product
        ),
        currentProduct: []
      }
    }
    return initialState
  },

  [actions.ADD_NEW_PRODUCT]: (state, { payload }) => {
    if (payload) {
      return { ...state, products: [...state.products, payload] }
    }
    return initialState
  },

  [actions.DELETE_PRODUCT]: (state, { payload }) => {
    if (payload) {
      return {
        ...state,
        products: state.products.filter(({ id }: { id: number }) => id !== payload),
        currentProduct: null
      }
    }
    return initialState
  },

  [actions.SEARCH_PRODUCT]: (state, { payload }) => {
    if (payload) {
      const rexExp = new RegExp(payload, 'i')
      return {
        ...state,
        products: state.products.filter(({ name }: { name: string }) => name.match(rexExp))
      }
    }
    return initialState
  },

  [actions.SORT_PRODUCTS]: (state, { payload }) => {
    if (payload) {
      if (payload.isAscending === false) {
        // Sorting doesn't change the reference, so the component doesn't rerender
        const newArr = state.products.sort(
          (a: any, b: any) => a[payload.parameter] - b[payload.parameter]
        )
        return {
          ...state,
          products: [...newArr]
        }
      } else if (payload.isAscending === true) {
        const newArr = state.products.sort(
          (a: any, b: any) => b[payload.parameter] - a[payload.parameter]
        )
        return {
          ...state,
          products: [...newArr]
        }
      }
    }
    return initialState
  }
}
