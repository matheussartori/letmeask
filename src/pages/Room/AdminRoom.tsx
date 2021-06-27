import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'
import emptyQuestionsImg from '../../assets/images/empty-questions.svg'

import { BiExit } from 'react-icons/bi'

import { Button } from '../../components/Button'
import { Question } from '../../components/Question'
import { RoomCode } from '../../components/RoomCode'
import { ThemeSwitch } from '../../components/ThemeSwitch'

import { useRoom } from '../../hooks/useRoom'
import { useModal } from '../../hooks/useModal'

import { database } from '../../services/firebase'

import { Container } from './styles'

type RoomParams = {
  id: string
}

export function AdminRoom(): JSX.Element {
  const [sharedQuestionId, setSharedQuestionId] = useState('')
  const [action, setAction] = useState('')

  const params = useParams<RoomParams>()
  const roomId = params.id
  const history = useHistory()

  const { addToast } = useToasts()
  const { title, questions } = useRoom(roomId)
  const { openModal, isConfirmed, setIsConfirmed } = useModal()

  useEffect(() => {
    async function handleEndRoom() {
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
    async function handleDeleteQuestion() {
      if (isConfirmed && action === 'delete_question') {
        await database
          .ref(`rooms/${roomId}/questions/${sharedQuestionId}`)
          .remove()
      }
      setIsConfirmed(false)
      setAction('')
    }
    handleDeleteQuestion()
  }, [isConfirmed])

  async function openEndRoomModal() {
    setAction('end_room')
    openModal({
      title: 'Encerrar sala',
      icon: 'denied',
      text: 'Tem certeza que você deseja encerrar esta sala?',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, encerrar'
    })
  }

  async function openDeleteQuestionModal(questionId: string) {
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

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  return (
    <Container>
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={openEndRoomModal}>
              Encerrar sala
            </Button>
            <Button
              variant="danger"
              title="Sair da sala"
              onClick={() => history.push('/')}
            >
              <BiExit />
            </Button>
            <ThemeSwitch />
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
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
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                      />
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

        {questions && questions.length === 0 && (
          <div className="empty-questions" style={{ marginTop: 150 }}>
            <img src={emptyQuestionsImg} alt="Nenhuma pergunta" />
            <h3>Nenhuma pergunta por aqui...</h3>
            <p>
              Envie o código desta sala para seus amigos e comece a responder
              perguntas!
            </p>
          </div>
        )}
      </main>
    </Container>
  )
}
