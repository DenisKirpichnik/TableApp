import React, { FC, ChangeEvent, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { searchProduct } from '../../state/actions'
import History from '../History'

export const SearchBar: FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get('search')
    setSearchValue(search ? search : '')
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeSearchHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setSearchValue(target.value)
    History.push('?search=' + target.value)
    if (target.value === '') {
      dispatch(searchProduct(''))
    }
  }

  const onSubmitSearhHandler = () => {
    dispatch(searchProduct(searchValue))
  }

  return (
    <div className="table__searchBar-container">
      <input type="text" onChange={onChangeSearchHandler} value={searchValue} />
      <button onClick={onSubmitSearhHandler} disabled={searchValue ? false : true}>
        Search
      </button>
    </div>
  )
}
