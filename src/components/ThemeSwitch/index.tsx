import Switch from 'react-switch'

import { useTheme } from '../../hooks/useTheme'

import { Container } from './styles'

export function ThemeSwitch(): JSX.Element {
  const { theme, toggleTheme } = useTheme()

  return (
    <Container>
      <Switch
        onChange={toggleTheme}
        checked={theme === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={20}
        width={40}
        handleDiameter={20}
      />
    </Container>
  )
}
