import ReactModal from 'react-modal'
import { BiTrashAlt } from 'react-icons/bi'
import { RiCloseCircleLine } from 'react-icons/ri'

import { GlobalModalStyle } from './styles'

type ModalProps = {
  isOpen: boolean
  icon: string
  cancelButtonText?: string
  confirmButtonText: string
  title: string
  text: string
  setIsOpen: (open: boolean) => void
  handleClose: () => void
}

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

export function Modal({
  isOpen,
  icon,
  cancelButtonText,
  confirmButtonText,
  title,
  text,
  setIsOpen,
  handleClose
}: ModalProps): JSX.Element {
  return (
    <>
      <GlobalModalStyle />
      <ReactModal
        isOpen={isOpen}
        style={customStyle}
        ariaHideApp={false}
        closeTimeoutMS={200}
      >
        {icon === 'trash' ? <BiTrashAlt /> : <RiCloseCircleLine />}
        <h3>{title}</h3>
        <p>{text}</p>
        <footer>
          {cancelButtonText && cancelButtonText.length > 0 && (
            <button
              className="modal-button-cancel"
              onClick={() => setIsOpen(false)}
            >
              {cancelButtonText}
            </button>
          )}
          <button className="modal-button-confirm" onClick={handleClose}>
            {confirmButtonText}
          </button>
        </footer>
      </ReactModal>
    </>
  )
}
