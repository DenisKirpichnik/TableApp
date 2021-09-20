import { Product } from '../interfaces/interfaces'
import * as actionTypes from './actionTypes'

export const addNewProduct = (payload: Product) => ({
  type: actionTypes.ADD_NEW_PRODUCT,
  payload,
})

export const editProduct = (payload: Product) => ({
  type: actionTypes.EDIT_PRODUCT,
  payload,
})

export const deleteProduct = (payload: number) => ({
  type: actionTypes.DELETE_PRODUCT,
  payload,
})

export const sortProducts = (parameter: string, isAscending: boolean) => ({
  type: actionTypes.SORT_PRODUCTS,
  payload: { parameter: parameter, isAscending: isAscending },
})

export const setCurrentProduct = (payload: number | null) => ({
  type: actionTypes.SET_CURRENT_PRODUCT,
  payload,
})

export const searchProduct = (payload: string) => ({
  type: actionTypes.SEARCH_PRODUCT,
  payload,
})
