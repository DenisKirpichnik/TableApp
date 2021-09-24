import React, { FC, ChangeEvent, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getProducts, searchProduct } from '../../state/products/actions'
import History from '../History'

const SearchBar: FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get('search')
    setSearchValue(search ? search : '')
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeSearchHandler = React.useCallback(
    (e: ChangeEvent) => {
      const target = e.target as HTMLInputElement
      setSearchValue(target.value)
      History.push('?search=' + target.value)
      if (target.value === '') {
        dispatch(getProducts())
      }
    },
    [dispatch]
  )

  const onSubmitSearhHandler = React.useCallback(() => {
    dispatch(searchProduct(searchValue))
  }, [searchValue, dispatch])

  return (
    <div className="table__searchBar-container">
      <input type="text" onChange={onChangeSearchHandler} value={searchValue} />
      <button onClick={onSubmitSearhHandler} disabled={searchValue ? false : true}>
        Search
      </button>
    </div>
  )
}
export default React.memo(SearchBar)
