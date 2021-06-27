import styled, { css } from 'styled-components'

interface ButtonProps {
  isOutlined: boolean
  variant: 'normal' | 'danger'
}

export const Container = styled.button<ButtonProps>`
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: #835afd;
  color: #fff;
  padding: 0 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  img {
    margin-right: 8px;
  }

  ${props =>
    props.isOutlined &&
    css`
      background: ${props => props.theme.colors.background};
      border: 1px solid #835afd;
      color: #835afd;
    `}

  ${props =>
    props.variant === 'danger' &&
    css`
      background: #e73f5d;
    `}

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
