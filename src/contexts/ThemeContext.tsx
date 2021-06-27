import { useCallback, createContext, ReactNode } from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components'

import { usePersistedState } from '../hooks/usePersistedState'

import light from '../styles/themes/light'
import dark from '../styles/themes/dark'

type ThemeContextProviderProps = {
  children: ReactNode
}

export type ThemeContextType = {
  theme: string
  toggleTheme: () => void
}

export const ThemeContext = createContext({} as ThemeContextType)

export function ThemeContextProvider({
  children
}: ThemeContextProviderProps): JSX.Element {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light)

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme: theme.title, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
