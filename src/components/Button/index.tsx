import { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
  variant?: 'normal' | 'danger'
}

export function Button({
  isOutlined = false,
  variant = 'normal',
  ...props
}: ButtonProps): JSX.Element {
  return <Container isOutlined={isOutlined} variant={variant} {...props} />
}
