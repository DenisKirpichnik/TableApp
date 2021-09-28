export interface Product {
  id: number
  name: string
  count: number
  price: number
}

export interface ModalProps {
  closeModal: () => void
  onConfirm?: () => void
  currentProduct?: Product[]
}

type Countries = 'Russia' | 'Japan' | 'Canada' | ''

export interface FormikValues {
  name: string
  email: string
  count: number
  price: number
  country: Countries
  city: string | string[]
}
