import { RefObject, useEffect } from 'react'
import { setCurrentProduct } from '../state/products/actions'
import { useDispatch } from 'react-redux'

type AnyEvent = MouseEvent | TouchEvent

function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void
): void {
  const dispatch = useDispatch()
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = ref?.current
      if (!el || el.contains(event.target as Node)) {
        return
      }
      handler(event)
      dispatch(setCurrentProduct(null))
    }
    document.addEventListener(`mousedown`, listener)
    document.addEventListener(`touchstart`, listener)
    return () => {
      document.removeEventListener(`mousedown`, listener)
      document.removeEventListener(`touchstart`, listener)
    }
  }, [ref, handler])
}

export default useClickOutside
