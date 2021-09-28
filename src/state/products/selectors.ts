import { createSelector } from 'reselect'
import { RootState } from '../store'

export const prod = (state: RootState) => state.product.products
const currProduct = (state: RootState) => state.product.currentProduct

export const allProducts = createSelector([prod], products => {
  return products
})

export const oneCurrentProduct = createSelector([currProduct], currProduct => {
  return currProduct
})
