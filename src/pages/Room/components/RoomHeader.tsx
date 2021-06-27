import { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import logoImg from '../../../assets/images/logo.svg'

import { useModal } from '../../../hooks/useModal'
import { useToasts } from 'react-toast-notifications'

import { database } from '../../../services/firebase'

import { Button } from '../../../components/Button'
import { RoomCode } from '../../../components/RoomCode'
import { ThemeSwitch } from '../../../components/ThemeSwitch'

import { Container } from './styles'

type RoomHeaderProps = {
  roomId: string
  isAdmin?: boolean
}

export function RoomHeader({ roomId, isAdmin }: RoomHeaderProps): JSX.Element {
  const history = useHistory()
  const { openModal, isConfirmed, setIsConfirmed } = useModal()
  const { addToast } = useToasts()

  useEffect(() => {
    async function handleEndRoom() {
      if (isConfirmed) {
        await database.ref(`rooms/${roomId}`).update({
          endedAt: new Date()
        })

        history.push('/')
        addToast('Sala encerrada com sucesso!', {
          appearance: 'success',
          autoDismiss: true
        })
      }
      setIsConfirmed(false)
    }
    handleEndRoom()
  }, [isConfirmed])

  async function openEndRoomModal() {
    openModal({
      title: 'Close room',
      icon: 'denied',
      text: 'Are you sure you want to close this room?',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, close'
    })
  }

  return (
    <Container>
      <div className="content">
        <Link to="/">
          <img src={logoImg} alt="Letmeask" />
        </Link>
        <div>
          <RoomCode code={roomId} />
          {isAdmin && (
            <Button isOutlined onClick={openEndRoomModal}>
              Close this room
            </Button>
          )}
          <ThemeSwitch />
        </div>
      </div>
    </Container>
  )
}
