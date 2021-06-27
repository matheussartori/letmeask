import { useCallback, createContext, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

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
  const [theme, setTheme] = usePersistedState<string>('theme', 'light')

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === 'light' ? light : dark}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
