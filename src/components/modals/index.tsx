// import React, { FC } from 'react'
// import ReactDOM from 'react-dom'
// import { ModalProps } from '../../interfaces/interfaces'

import EditModal from './EditModal/EditModal'
import DeleteModal from './DeleteModal/DeleteModal'

export const MODAL_TYPES = {
  CREATE_MODAL: 'DELETE_PRODUCT_MODAL',
  EDIT_MODAL: 'EDIT_PRODUCT_MODAL'
}

export const MODALS: any = {
  [MODAL_TYPES.CREATE_MODAL]: DeleteModal,
  [MODAL_TYPES.EDIT_MODAL]: EditModal
}
