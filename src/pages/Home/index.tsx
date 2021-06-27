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
        text: 'The specified room does not exists.',
        icon: 'denied',
        confirmButtonText: 'OK'
      })
      return
    }

    if (roomRef.val().endedAt) {
      openModal({
        title: 'Oops!',
        text: 'This room was already closed.',
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
          alt="Illustration symbolizing questions and answers"
        />
        <strong>Create live Q&amp;A rooms</strong>
        <p>Ask your audience&apos;s questions in real-time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImage} alt="Google Logo" />
            Create your room with google
          </button>
          <div className="separator">or enter a room</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Type the room code"
              value={roomCode}
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit">Join room</Button>
          </form>
        </div>
      </main>
    </Container>
  )
}
