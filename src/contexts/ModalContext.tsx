import { ReactNode, createContext, useState } from 'react'
import ReactModal from 'react-modal'
import { BiTrashAlt } from 'react-icons/bi'
import { RiCloseCircleLine } from 'react-icons/ri'

import '../styles/modal.scss'

type OpenModalDTO = {
  title: string
  text: string
  icon: 'trash' | 'denied'
  cancelButtonText: string
  confirmButtonText: string
}

type ModalContextType = {
  isConfirmed: boolean
  setIsConfirmed: (confirmed: boolean) => void
  openModal: (modalAttributes: OpenModalDTO) => void
}

type ModalContextProviderProps = {
  children: ReactNode
}

export const ModalContext = createContext({} as ModalContextType)

const customStyle = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,.8)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    padding: '60px 100px'
  }
}

export function ModalContextProvider ({ children }: ModalContextProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [icon, setIcon] = useState('')
  const [cancelButtonText, setCancelButtonText] = useState('')
  const [confirmButtonText, setConfirmButtonText] = useState('')

  function openModal ({
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
    setCancelButtonText(cancelButtonText)
    setConfirmButtonText(confirmButtonText)
  }

  function handleClose () {
    setIsOpen(false)
    setIsConfirmed(true)
  }

  return (
    <ModalContext.Provider value={{ isConfirmed, openModal, setIsConfirmed }}>
      <ReactModal
        isOpen={isOpen}
        style={customStyle}
        ariaHideApp={false}
      >
        {icon === 'trash' ? <BiTrashAlt /> : <RiCloseCircleLine /> }
        <h3>{title}</h3>
        <p>{text}</p>
        <footer>
          <button className="modal-button-cancel" onClick={() => setIsOpen(false)}>{cancelButtonText}</button>
          <button className="modal-button-confirm" onClick={handleClose}>{confirmButtonText}</button>
        </footer>
      </ReactModal>
      {children}
    </ModalContext.Provider>
  )
}
