import React, { FC, useRef } from 'react'
import { ModalProps } from '../../../interfaces/interfaces'
import useClickOutside from '../../../hooks/useClickOutside'

const DeleteModal: FC<ModalProps> = ({ closeModal, onConfirm, currentProduct }) => {
  const ref = useRef<HTMLDivElement>(null)

  const confirmCloseModal = React.useCallback(() => {
    onConfirm && onConfirm()
    closeModal()
  }, [onConfirm, closeModal])

  const handleCloseModal = React.useCallback(() => {
    closeModal()
  }, [closeModal])

  useClickOutside(ref, handleCloseModal)

  return (
    <>
      <div className="modal-overlay" />
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="deleteModal" ref={ref}>
          <div className="modal-header"></div>
          <p>
            Are you sure you want to delete product - {currentProduct && currentProduct[0].name}
          </p>
          <div className="modal-buttons-container">
            <button className="cancel-button" onClick={closeModal}>
              No
            </button>
            <button className="confirm-button" onClick={confirmCloseModal}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteModal
