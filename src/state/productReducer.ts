import { Product } from '../interfaces/interfaces'
import * as actionTypes from './actionTypes'

interface InitialState {
  currentProduct: null | Product
  products: Product[]
}

const initialState: InitialState = {
  currentProduct: null,
  products: [
    {
      id: 1,
      name: 'BMW',
      count: 25,
      price: 15252,
    },
    {
      id: 2,
      name: 'Porshe',
      count: 5,
      price: 67742,
    },
    {
      id: 3,
      name: 'Audi',
      count: 15,
      price: 32552,
    },
    {
      id: 4,
      name: 'Opel',
      count: 435,
      price: 500,
    },
  ],
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
    case actionTypes.SORT_PRODUCTS: {
      if (payload.isAscending === false) {
        // Sorting didn't change the reference so the component didn't rerender
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

export default productReducer
