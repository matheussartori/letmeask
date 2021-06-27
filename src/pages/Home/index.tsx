import { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { useModal } from '../../hooks/useModal'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import googleIconImage from '../../assets/images/google-icon.svg'

import { Button } from '../../components/Button'

import { database } from '../../services/firebase'

import { Container } from './styles'

export function Home(): JSX.Element {
  const [roomCode, setRoomCode] = useState('')
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const { openModal } = useModal()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      openModal({
        title: 'Oops!',
        text: 'A sala informada não existe.',
        icon: 'denied',
        confirmButtonText: 'OK'
      })
      return
    }

    if (roomRef.val().endedAt) {
      openModal({
        title: 'Oops!',
        text: 'A sala informada já foi encerrada.',
        icon: 'denied',
        confirmButtonText: 'OK'
      })
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <Container>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImage} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </Container>
  )
}
