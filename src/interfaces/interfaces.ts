export interface Product {
  id: number
  name: string
  count: number
  price: number
}

type ModalType = 'delete' | 'content'

export interface ModalProps {
  modalType?: ModalType
  isShowing?: boolean
  hide?: () => void
  yesAction?: (id: number) => void
  productName?: number
  ref?: any
}
