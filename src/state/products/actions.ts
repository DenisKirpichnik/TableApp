import { Dispatch } from 'react'
import { Product } from '../../interfaces/interfaces'
import { actions } from './actionTypes'
import { Action } from './productReducers'
// import initialProducts from '../../mockData/initialProducts.json'

export const getProducts = () => async (dispatch: Dispatch<Action<string, Product[]>>) => {
  try {
    const response = await fetch(`${window.location.origin}/initialProducts.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    const { products } = await response.json()
    const payload = products
    dispatch({ type: actions.GET_PRODUCTS, payload })
  } catch (err) {
    console.log(err)
  }
}

export const addNewProduct = (payload: Product) => ({
  type: actions.ADD_NEW_PRODUCT,
  payload
})

export const editProduct = (payload: Product) => ({
  type: actions.EDIT_PRODUCT,
  payload
})

export const deleteProduct = (payload: number) => ({
  type: actions.DELETE_PRODUCT,
  payload
})

export const sortProducts = (parameter: 'price' | 'count', isAscending: boolean) => ({
  type: actions.SORT_PRODUCTS,
  payload: { parameter: parameter, isAscending: isAscending }
})

export const setCurrentProduct = (payload: number | null) => ({
  type: actions.SET_CURRENT_PRODUCT,
  payload
})

export const searchProduct = (payload: string) => ({
  type: actions.SEARCH_PRODUCT,
  payload
})
