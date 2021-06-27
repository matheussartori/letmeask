import { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'

import './styles.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
  variant?: 'normal' | 'danger'
}

export function Button({
  isOutlined = false,
  variant = 'normal',
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={cx(
        'button',
        { outlined: isOutlined },
        { danger: variant === 'danger' }
      )}
      {...props}
    />
  )
}
