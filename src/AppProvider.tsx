import { ReactNode } from 'react'

import { ToastProvider } from 'react-toast-notifications'
import { ThemeProvider } from 'styled-components'

import { AuthContextProvider } from './contexts/AuthContext'
import { ModalContextProvider } from './contexts/ModalContext'

import light from './styles/themes/light'
import dark from './styles/themes/dark'

type AppProviderProps = {
  children?: ReactNode
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <ThemeProvider theme={light}>
      <ToastProvider>
        <AuthContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </AuthContextProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
