import { createSelector } from 'reselect'

export const prod = (state: any) => state.product.products
const currProduct = (state: any) => state.product.currentProduct

export const allProducts = createSelector([prod], products => {
  return products
})

export const oneCurrentProduct = createSelector([currProduct], currProduct => {
  return currProduct
})
