import React, { FC, memo } from 'react'
import { formatNumber } from '../../helpers/formatNumber'
import { Product } from '../../interfaces/interfaces'

interface TableRowProps {
  product: Product
  openEditingModal: (productId: number) => void
  openDeleteModalSetCurrentProduct: (productId: number) => void
}

const TableRow: FC<TableRowProps> = ({
  product,
  openEditingModal,
  openDeleteModalSetCurrentProduct
}) => {
  const handleDeleteProduct = React.useCallback(() => {
    openDeleteModalSetCurrentProduct(product.id)
  }, [openDeleteModalSetCurrentProduct, product.id])

  const handleEditProduct = React.useCallback(() => {
    openEditingModal(product.id)
  }, [openEditingModal, product.id])

  return (
    <tr>
      <td className="table-tdflex">
        <button className="table__productDescription-link" onClick={handleEditProduct}>
          {product.name}
        </button>{' '}
        <div className="table__count">
          <span>{product.count}</span>
        </div>
      </td>
      <td className="table-priceCell">{formatNumber(product.price)}</td>
      <td>
        <button onClick={handleEditProduct} className="table__delete-button">
          Edit
        </button>
        <button onClick={handleDeleteProduct} className="table__edit-button">
          Delete
        </button>
      </td>
    </tr>
  )
}

export default memo(TableRow)
