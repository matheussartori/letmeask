import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'

import { Button } from '../../components/Button'
import { Question } from '../../components/Question'
import { RoomCode } from '../../components/RoomCode'

import { useRoom } from '../../hooks/useRoom'
import { useModal } from '../../hooks/useModal'

import { database } from '../../services/firebase'

import './styles.scss'
import { useToasts } from 'react-toast-notifications'

type RoomParams = {
  id: string
}

export function AdminRoom () {
  const [sharedQuestionId, setSharedQuestionId] = useState('')
  const [action, setAction] = useState('')

  const params = useParams<RoomParams>()
  const roomId = params.id
  const history = useHistory()

  const { addToast } = useToasts()
  const { title, questions } = useRoom(roomId)
  const { openModal, isConfirmed, setIsConfirmed } = useModal()

  useEffect(() => {
    async function handleEndRoom () {
      if (isConfirmed && action === 'end_room') {
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
      setAction('')
    }
    handleEndRoom()
  }, [isConfirmed])

  useEffect(() => {
    async function handleDeleteQuestion () {
      if (isConfirmed && action === 'delete_question') {
        await database.ref(`rooms/${roomId}/questions/${sharedQuestionId}`).remove()
      }
      setIsConfirmed(false)
      setAction('')
    }
    handleDeleteQuestion()
  }, [isConfirmed])

  async function openEndRoomModal () {
    setAction('end_room')
    openModal({
      title: 'Encerrar sala',
      icon: 'denied',
      text: 'Tem certeza que você deseja encerrar esta sala?',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, encerrar'
    })
  }

  async function openDeleteQuestionModal (questionId: string) {
    setAction('delete_question')
    setSharedQuestionId(questionId)
    openModal({
      title: 'Excluir pergunta',
      icon: 'trash',
      text: 'Tem certeza que você deseja excluir esta pergunta?',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, excluir'
    })
  }

  async function handleCheckQuestionAsAnswered (questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion (questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button
              isOutlined
              onClick={openEndRoomModal}
            >Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 ?? (
            <span>{questions.length} pergunta(s)</span>
          )}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => openDeleteQuestionModal(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}