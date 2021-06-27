import { useContext } from 'react'
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'

export function useTheme(): ThemeContextType {
  const value = useContext<ThemeContextType>(ThemeContext)

  return value
}
