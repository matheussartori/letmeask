import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'
import emptyQuestionsImg from '../../assets/images/empty-questions.svg'

import { RoomHeader } from './components/RoomHeader'
import { Question } from '../../components/Question'

import { useRoom } from '../../hooks/useRoom'
import { useModal } from '../../hooks/useModal'

import { database } from '../../services/firebase'

import { Container } from './styles'

type RoomParams = {
  id: string
}

export function AdminRoom(): JSX.Element {
  const [sharedQuestionId, setSharedQuestionId] = useState('')

  const params = useParams<RoomParams>()
  const roomId = params.id

  const { title, questions } = useRoom(roomId)
  const { openModal, isConfirmed, setIsConfirmed } = useModal()

  useEffect(() => {
    async function handleDeleteQuestion() {
      if (isConfirmed) {
        await database
          .ref(`rooms/${roomId}/questions/${sharedQuestionId}`)
          .remove()
      }
      setIsConfirmed(false)
    }
    handleDeleteQuestion()
  }, [isConfirmed])

  async function openDeleteQuestionModal(questionId: string) {
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
      <RoomHeader roomId={roomId} isAdmin />
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
