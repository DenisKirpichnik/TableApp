import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../components/modals/Modal'
import useModal from '../components/useModal'
import { Product } from '../interfaces/interfaces'
import { deleteProduct, setCurrentProduct, sortProducts } from '../state/actions'
import { RootState } from '../state/store'

type SortConfig = {
  priceAscDirection: boolean
  countAscDirection: boolean
}

export const Table = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ priceAscDirection: false, countAscDirection: false })
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.product.products)
  const currentProduct = useSelector((state: RootState) => state.product.currentProduct)
  console.log('currentProduct', currentProduct)
  const { isShowing, toggle } = useModal()

  const handleDeleteProduct = () => {
    if (currentProduct) {
      console.log('testing', currentProduct.id)
      dispatch(deleteProduct(currentProduct[0].id))
      dispatch(setCurrentProduct(null))
    }
  }

  const openModalSetCurrentProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const id = Number(target.getAttribute('data-id'))
    dispatch(setCurrentProduct(id))
    toggle()
  }

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const parameter = target.getAttribute('data-id')
    if (parameter === 'price') {
      setSortConfig({ countAscDirection: false, priceAscDirection: !sortConfig.priceAscDirection })
      dispatch(sortProducts(parameter, sortConfig.priceAscDirection))
    } else if (parameter === 'count') {
      setSortConfig({ priceAscDirection: false, countAscDirection: !sortConfig.countAscDirection })
      dispatch(sortProducts(parameter, sortConfig.countAscDirection))
    }
  }

  console.log(products)
  return (
    <div>
      {isShowing && (
        <Modal
          isShowing={isShowing}
          hide={toggle}
          yesAction={handleDeleteProduct}
          productName={currentProduct && currentProduct[0].name}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>
              Name{' '}
              <button data-id={'count'} onClick={handleSort}>
                X
              </button>
            </th>
            <th>
              Price{' '}
              <button data-id={'price'} onClick={handleSort}>
                Y
              </button>
            </th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id}>
              <td>
                {product.name} {product.count}
              </td>
              <td>{product.price}</td>
              <td>
                <button data-id={product.id}>Edit</button>
                <button data-id={product.id} onClick={openModalSetCurrentProduct}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
