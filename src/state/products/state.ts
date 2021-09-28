import { Product } from '../../interfaces/interfaces'
//import { initialProducts } from './mockData'

export interface InitialState {
  currentProduct: null | Product
  products: Product[]
}

export const state: InitialState = {
  currentProduct: null,
  products: []
}
