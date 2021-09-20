import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentProduct } from '../../state/actions'

const useModal = () => {
  const dispatch = useDispatch()
  const [isShowing, setIsShowing] = useState(false)
  function toggle() {
    setIsShowing(!isShowing)
    if (isShowing === true) {
      dispatch(setCurrentProduct(null))
    }
  }
  return {
    isShowing,
    toggle,
  }
}

export default useModal
