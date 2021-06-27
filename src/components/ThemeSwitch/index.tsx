import Switch from 'react-switch'

import { useTheme } from '../../hooks/useTheme'

import { SwitchIcon } from './components/SwitchIcon'

import { Container } from './styles'

export function ThemeSwitch(): JSX.Element {
  const { theme, toggleTheme } = useTheme()

  return (
    <Container>
      <Switch
        onChange={toggleTheme}
        checked={theme === 'dark'}
        checkedIcon={<SwitchIcon icon="sun" />}
        uncheckedIcon={<SwitchIcon icon="moon" />}
        height={25}
        width={50}
        handleDiameter={25}
        onColor="#835afd"
      />
    </Container>
  )
}
