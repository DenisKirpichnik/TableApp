import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { ModalProps } from '../../interfaces/interfaces'

import { ContentModal } from './ContentModal/ContentModal'
import DeleteModal from './DeleteModal/DeleteModal'

const Modal: FC<ModalProps> = ({ isShowing, hide, yesAction, productName, modalType }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <>
          {modalType === 'delete' ? (
            <DeleteModal hide={hide} productName={productName} yesAction={yesAction} />
          ) : (
            <ContentModal hide={hide} />
          )}
        </>,
        document.body
      )
    : null
}

export default Modal
