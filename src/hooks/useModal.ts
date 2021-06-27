import { useContext } from 'react'
import { ModalContext, ModalContextType } from '../contexts/ModalContext'

export function useModal(): ModalContextType {
  const value = useContext<ModalContextType>(ModalContext)

  return value
}
