import React, { useState, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../components/modals/Modal'
import { SearchBar } from '../components/searchBar/SearchBar'
import useModal from '../utils/customHooks/useModal'
import { Product } from '../interfaces/interfaces'
import { deleteProduct, setCurrentProduct, sortProducts } from '../state/actions'
import { allProducts, oneCurrentProduct } from '../state/productReducer'

type SortConfig = {
  priceAscDirection: boolean
  countAscDirection: boolean
}

export const Table: FC = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ priceAscDirection: false, countAscDirection: false })
  const { isShowing, toggle } = useModal()
  const { isShowing: isContentModalShowin, toggle: setContentModalShowing } = useModal()
  const dispatch = useDispatch()
  const products = useSelector(allProducts)
  const currentProduct = useSelector(oneCurrentProduct)

  console.log(products)

  const openDeleteModalSetCurrentProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const id = Number(target.getAttribute('data-id'))
    dispatch(setCurrentProduct(id))
    toggle()
  }

  const openContentModalForEditing = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const id = Number(target.getAttribute('data-id'))
    dispatch(setCurrentProduct(id))
    setContentModalShowing()
  }

  const openContentModalForCreatingNew = () => {
    setContentModalShowing()
  }

  const handleDeleteProduct = () => {
    if (currentProduct) {
      dispatch(deleteProduct(currentProduct[0].id))
      dispatch(setCurrentProduct(null))
    }
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

  return (
    <div className="table__main-wrapper">
      {isShowing && (
        <Modal
          modalType="delete"
          isShowing={isShowing}
          hide={toggle}
          yesAction={handleDeleteProduct}
          productName={currentProduct && currentProduct[0].name}
        />
      )}
      {isContentModalShowin && (
        <Modal modalType="content" isShowing={isContentModalShowin} hide={setContentModalShowing} />
      )}
      <div className="table__main-container">
        <div className="table__top-bar">
          <SearchBar />
          <button onClick={openContentModalForCreatingNew}>Add New</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                Name{' '}
                <button className="table__sort-button" data-id={'count'} onClick={handleSort}>
                  X
                </button>
              </th>
              <th>
                Price{' '}
                <button className="table__sort-button" data-id={'price'} onClick={handleSort}>
                  Y
                </button>
              </th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product.id}>
                <td className="table-tdflex">
                  <button
                    data-id={product.id}
                    className="table__productDescription-link"
                    onClick={openContentModalForEditing}
                  >
                    {product.name}
                  </button>{' '}
                  <div className="table__count">
                    <span>{product.count}</span>
                  </div>
                </td>
                <td>{product.price}</td>
                <td>
                  <button data-id={product.id} onClick={openContentModalForEditing}>
                    Edit
                  </button>
                  <button data-id={product.id} onClick={openDeleteModalSetCurrentProduct}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
