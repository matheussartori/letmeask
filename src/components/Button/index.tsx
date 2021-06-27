import { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

export function Button({
  isOutlined = false,
  ...props
}: ButtonProps): JSX.Element {
  return <Container isOutlined={isOutlined} {...props} />
}
