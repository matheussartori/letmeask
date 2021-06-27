import { ReactNode } from 'react'

import { ToastProvider } from 'react-toast-notifications'

import { AuthContextProvider } from './contexts/AuthContext'
import { ModalContextProvider } from './contexts/ModalContext'
import { ThemeContextProvider } from './contexts/ThemeContext'

import { GlobalStyles } from './styles/global'

type AppProviderProps = {
  children?: ReactNode
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <ThemeContextProvider>
      <GlobalStyles />
      <ToastProvider>
        <AuthContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </AuthContextProvider>
      </ToastProvider>
    </ThemeContextProvider>
  )
}
