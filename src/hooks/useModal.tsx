import React from 'react'
import ReactDOM from 'react-dom'

import { useDialogDispatch, useDialogContext } from '../context/DialogContainer'

const Container = document.getElementById('dialog-root')

type AbstractModalProps = any

export const useModal = <T extends Record<string, unknown>>(
  name: string,
  Modal: React.FC<AbstractModalProps>
): any => {
  const state = useDialogContext(name)
  const dispatch = useDialogDispatch()

  const openModal = React.useCallback(() => {
    window.document.body.style.overflow = 'hidden'
    if (dispatch) {
      dispatch({ name, isOpen: true })
    }
  }, [dispatch, name])

  const closeModal = React.useCallback(() => {
    window.document.body.style.overflow = 'auto'
    if (dispatch) dispatch({ name, isOpen: false })
  }, [dispatch, name])

  const Dialog = (props: T) =>
    state
      ? ReactDOM.createPortal(
          <Modal {...props} openModal={openModal} closeModal={closeModal} />,
          Container
        )
      : null

  return [openModal, Dialog, closeModal, state]
}
