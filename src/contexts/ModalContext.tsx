import { ReactNode, createContext, useState } from 'react'

import { Modal } from '../components/Modal'

type OpenModalDTO = {
  title: string
  text: string
  icon: 'trash' | 'denied'
  cancelButtonText?: string
  confirmButtonText: string
}

export type ModalContextType = {
  isConfirmed: boolean
  setIsConfirmed: (confirmed: boolean) => void
  openModal: (modalAttributes: OpenModalDTO) => void
}

type ModalContextProviderProps = {
  children: ReactNode
}

export const ModalContext = createContext({} as ModalContextType)

export function ModalContextProvider({
  children
}: ModalContextProviderProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [icon, setIcon] = useState('')
  const [cancelButtonText, setCancelButtonText] = useState<string | undefined>(
    undefined
  )
  const [confirmButtonText, setConfirmButtonText] = useState('')

  function openModal({
    title,
    text,
    icon,
    cancelButtonText,
    confirmButtonText
  }: OpenModalDTO) {
    setIsOpen(true)
    setIsConfirmed(false)
    setTitle(title)
    setText(text)
    setIcon(icon)
    if (cancelButtonText && cancelButtonText.length > 0) {
      setCancelButtonText(cancelButtonText)
    } else {
      setCancelButtonText(undefined)
    }
    setConfirmButtonText(confirmButtonText)
  }

  function handleClose() {
    setIsOpen(false)
    setIsConfirmed(true)
  }

  return (
    <ModalContext.Provider value={{ isConfirmed, openModal, setIsConfirmed }}>
      <Modal
        isOpen={isOpen}
        icon={icon}
        title={title}
        text={text}
        confirmButtonText={confirmButtonText}
        cancelButtonText={cancelButtonText}
        handleClose={handleClose}
        setIsOpen={setIsOpen}
      />
      {children}
    </ModalContext.Provider>
  )
}
