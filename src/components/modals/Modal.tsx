import React, { FC } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isShowing: boolean
  hide: () => void
  yesAction: (id: number) => void
  productName: number
}

const Modal: FC<ModalProps> = ({ isShowing, hide, yesAction, productName }) => {
  const executeYesActionCloseModal = () => {
    yesAction(1)
    hide()
  }

  return isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay" />
          <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
              <div className="modal-header"></div>
              <p>Are you sure you want to delete product - {productName}</p>
              <button
                type="button"
                className="modal-close-button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={hide}
              >
                No
              </button>
              <button onClick={executeYesActionCloseModal}>Yes</button>
            </div>
          </div>
        </>,
        document.body
      )
    : null
}

export default Modal
