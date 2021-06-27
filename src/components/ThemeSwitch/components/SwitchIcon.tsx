import { FiMoon, FiSun } from 'react-icons/fi'

import { Container } from './styles'

type SwitchIconProps = {
  icon: 'moon' | 'sun'
}

export function SwitchIcon({ icon }: SwitchIconProps): JSX.Element {
  return (
    <Container>
      {icon === 'moon' ? (
        <FiMoon size={14} color="#444444" />
      ) : (
        <FiSun size={14} color="#CCCCCC" />
      )}
    </Container>
  )
}
