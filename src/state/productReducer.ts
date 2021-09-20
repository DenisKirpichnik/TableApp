import { Product } from '../interfaces/interfaces'
import * as actionTypes from './actionTypes'
import { initialProducts } from './mockData'
import { createSelector } from 'reselect'
import { RootState } from './store'

interface InitialState {
  currentProduct: null | Product
  products: Product[]
}

const initialState: InitialState = {
  currentProduct: null,
  products: initialProducts,
}

const productReducer = (state = initialState, action: any) => {
  const payload = action.payload
  switch (action.type) {
    case actionTypes.SET_CURRENT_PRODUCT: {
      return {
        ...state,
        currentProduct: state.products.filter((product) => product.id === payload),
      }
    }

    case actionTypes.EDIT_PRODUCT: {
      return {
        ...state,
        products: state.products.map((product) => (product.id === payload.id ? payload : product)),
      }
    }

    case actionTypes.ADD_NEW_PRODUCT: {
      return {
        ...state,
        products: [...state.products, payload],
      }
    }
    case actionTypes.DELETE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter((product) => product.id !== payload),
      }
    }
    case actionTypes.SEARCH_PRODUCT: {
      if (payload === '') {
        return {
          ...state,
          products: initialProducts,
        }
      }
      const rexExp = new RegExp(payload, 'i')
      return {
        ...state,
        products: state.products.filter(({ name }) => name.match(rexExp)),
      }
    }
    case actionTypes.SORT_PRODUCTS: {
      if (payload.isAscending === false) {
        // Sorting doesn't change the reference, so the component doesn't rerender
        const newArr = state.products.sort((a: any, b: any) => a[payload.parameter] - b[payload.parameter])
        return {
          ...state,
          products: [...newArr],
        }
      } else if (payload.isAscending === true) {
        const newArr = state.products.sort((a: any, b: any) => b[payload.parameter] - a[payload.parameter])
        return {
          ...state,
          products: [...newArr],
        }
      }
    }
    default:
      return state
  }
}

const prod = (state: RootState) => state.product.products
const currProduct = (state: RootState) => state.product.currentProduct

export const allProducts = createSelector([prod], (products) => {
  return products
})

export const oneCurrentProduct = createSelector([currProduct], (currProduct) => {
  return currProduct
})

export default productReducer
