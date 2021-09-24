import React, { useState, FC, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MODALS } from '../components/modals'
import SearchBar from '../components/searchBar/SearchBar'
import TableHead from '../components/table/TableHead'
import TableRow from '../components/table/TableRow'
import { Product } from '../interfaces/interfaces'
import {
  deleteProduct,
  getProducts,
  setCurrentProduct,
  sortProducts
} from '../state/products/actions'
import { allProducts, oneCurrentProduct } from '../state/products/selectors'
import { useModal } from '../hooks/useModal'

type SortConfig = {
  priceAscDirection: boolean
  countAscDirection: boolean
}

const Table: FC = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    priceAscDirection: false,
    countAscDirection: false
  })
  const dispatch = useDispatch()
  const products = useSelector(allProducts)
  const currentProduct = useSelector(oneCurrentProduct)
  console.log('currentProduct', currentProduct)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  // Delete Modal
  const DeleteModalDialog = () => (
    <MODALS.DELETE_PRODUCT_MODAL
      test="test"
      closeModal={closeDeleteModal}
      onConfirm={onConfirmDeleteModal}
      currentProduct={currentProduct}
    />
  )
  const [openDeleteModal, DeleteProductDialog, closeDeleteModal] = useModal(
    'confirm_delete_product',
    DeleteModalDialog
  )

  const onConfirmDeleteModal = useCallback(() => {
    if (currentProduct) {
      dispatch(deleteProduct(currentProduct[0].id))
    }
  }, [currentProduct, dispatch])

  const openDeleteModalSetCurrentProduct = useCallback(
    (productId: number) => {
      openDeleteModal()
      dispatch(setCurrentProduct(productId))
    },
    [dispatch, openDeleteModal]
  )

  // Edit Modal
  const EditModalDialog = () => (
    <MODALS.EDIT_PRODUCT_MODAL closeModal={closeEditModal} onConfirm={onConfirmEditModal} />
  )
  const [openEditModal, EditProductDialog, closeEditModal] = useModal(
    'add_edit_product',
    EditModalDialog
  )

  const onConfirmEditModal = useCallback(() => {
    if (currentProduct) {
      dispatch(deleteProduct(currentProduct[0].id))
      dispatch(setCurrentProduct(null))
    }
  }, [currentProduct, dispatch])

  const openEditingModal = useCallback(
    (productId: number) => {
      openEditModal()
      dispatch(setCurrentProduct(productId))
    },
    [openEditModal, dispatch]
  )

  // Sorting
  const handleSort = useCallback(
    (parameter: string) => {
      if (parameter === 'price') {
        setSortConfig({
          countAscDirection: false,
          priceAscDirection: !sortConfig.priceAscDirection
        })
        dispatch(sortProducts(parameter, sortConfig.priceAscDirection))
      } else if (parameter === 'count') {
        setSortConfig({
          priceAscDirection: false,
          countAscDirection: !sortConfig.countAscDirection
        })
        dispatch(sortProducts(parameter, sortConfig.countAscDirection))
      }
    },
    [dispatch, sortConfig]
  )

  return (
    <div className="table__main-wrapper">
      <DeleteProductDialog />
      <EditProductDialog />
      <div className="table__main-container">
        <div className="table__top-bar">
          <SearchBar />
          <button onClick={openEditModal}>Add New</button>
        </div>
        <table>
          <TableHead handleSort={handleSort} sortConfig={sortConfig} />
          <tbody>
            {products.map((product: Product) => (
              <TableRow
                product={product}
                key={product.id}
                openEditingModal={openEditingModal}
                openDeleteModalSetCurrentProduct={openDeleteModalSetCurrentProduct}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default React.memo(Table)
