import React, { FC, useRef } from 'react'
import { ModalProps } from '../../../interfaces/interfaces'
import useClickOutside from '../../../utils/customHooks/useClickOutside'

const DeleteModal: FC<ModalProps> = ({ hide, productName, yesAction }) => {
  const executeYesActionCloseModal = () => {
    if (yesAction) yesAction(1)
    hide()
  }

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, hide)

  console.log('fuck', ref)

  return (
    <>
      <div className="modal-overlay" />
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal" ref={ref}>
          <div className="modal-header"></div>
          <p>Are you sure you want to delete product - {productName}</p>
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            No
          </button>
          <button onClick={executeYesActionCloseModal}>Yes</button>
        </div>
      </div>
    </>
  )
}

export default DeleteModal
