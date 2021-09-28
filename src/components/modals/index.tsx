// import ReactDOM from 'react-dom'
// import { ModalProps } from '../../interfaces/interfaces'

import EditModal from './EditModal/EditModal'
import DeleteModal from './DeleteModal/DeleteModal'

interface ModalTypes {
  CREATE_MODAL: string
  EDIT_MODAL: string
}

export const MODAL_TYPES: ModalTypes = {
  CREATE_MODAL: 'DELETE_PRODUCT_MODAL',
  EDIT_MODAL: 'EDIT_PRODUCT_MODAL'
}

interface Modals {
  [x: string]: React.FC<any>
}

export const MODALS: Modals = {
  [MODAL_TYPES.CREATE_MODAL]: DeleteModal,
  [MODAL_TYPES.EDIT_MODAL]: EditModal
}
