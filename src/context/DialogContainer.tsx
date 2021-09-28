import React from 'react'

type ContextState = { name: string; isOpen: boolean }
type ContextDispatch = React.Dispatch<ContextState>

const DialogContext: React.Context<Array<ContextState>> = React.createContext([])
const DialogDispatchContext: React.Context<undefined | ContextDispatch> =
  React.createContext(undefined)

function action(state: ContextState[], payload: ContextState) {
  return payload.isOpen ? [...state, payload] : state.filter(dialog => dialog.name !== payload.name)
}

export const DialogContainer: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(action, [])
  return (
    <DialogContext.Provider value={state}>
      <DialogDispatchContext.Provider value={dispatch}>{children}</DialogDispatchContext.Provider>
    </DialogContext.Provider>
  )
}

export const useDialogDispatch = () => {
  const context = React.useContext(DialogDispatchContext)
  return context
}

export const useDialogContext = (name: string) => {
  const context = React.useContext(DialogContext)
  return context.find(dialog => dialog.name === name)
}
