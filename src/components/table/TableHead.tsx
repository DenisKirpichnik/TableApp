import React, { FC, memo, useCallback } from 'react'
import classNames from 'classnames'

interface TableHeadProps {
  handleSort: (parameter: string) => void
  sortConfig: { priceAscDirection: boolean; countAscDirection: boolean }
}

const TableHead: FC<TableHeadProps> = ({ handleSort, sortConfig }) => {
  const { priceAscDirection, countAscDirection } = sortConfig
  console.log(sortConfig)
  const handleSortPrice = useCallback(() => {
    handleSort('price')
  }, [handleSort])

  const handleSortCount = useCallback(() => {
    handleSort('count')
  }, [handleSort])

  const handleArrowDirectionChange = useCallback((booleanParam: boolean) => {
    return classNames({
      'triangle-up': booleanParam,
      'triangle-down': !booleanParam
    })
  }, [])

  return (
    <thead>
      <tr>
        <th>
          Name
          <button className={'table__sort-button'} onClick={handleSortCount}>
            <div className={handleArrowDirectionChange(countAscDirection)}></div>
          </button>
        </th>
        <th>
          Price
          <button className={'table__sort-button'} onClick={handleSortPrice}>
            <div className={handleArrowDirectionChange(priceAscDirection)}></div>
          </button>
        </th>
        <th>actions</th>
      </tr>
    </thead>
  )
}

export default memo(TableHead)
