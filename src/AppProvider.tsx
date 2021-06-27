import { ReactNode } from 'react'

import { ToastProvider } from 'react-toast-notifications'

import { AuthContextProvider } from './contexts/AuthContext'
import { ModalContextProvider } from './contexts/ModalContext'

type AppProviderProps = {
  children?: ReactNode
}

export function AppProvider ({ children }: AppProviderProps) {
  return (
    <ToastProvider>
      <AuthContextProvider>
        <ModalContextProvider>
          {children}
        </ModalContextProvider>
      </AuthContextProvider>
    </ToastProvider>
  )
}
