import styled, { css } from 'styled-components'

interface QuestionProps {
  isAnswered: boolean
  isHighlighted: boolean
}

export const Container = styled.section<QuestionProps>`
  background: #fefefe;
  border-radius: 8px;
  box-shadow: 0 2 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  & + section {
    margin-top: 8px;
  }

  ${props =>
    props.isHighlighted &&
    !props.isAnswered &&
    css`
      background: #f4f0ff;
      border: 1px solid #835afd;

      footer .user-info span {
        color: #29292e;
      }
    `}

  p {
    color: #29292e;
  }

  ${props =>
    props.isAnswered &&
    css`
      background: #dbdcdd;

      img {
        filter: grayscale(1);
      }
    `}

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .user-info {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      span {
        margin-left: 8px;
        color: #737380;
        font-size: 14px;
      }
    }

    > div {
      display: flex;
      gap: 16px;
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;
      transition: filter 0.2s;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: #737380;
        gap: 8px;

        &.liked {
          color: #835afd;

          svg path {
            stroke: #835afd;
          }
        }
      }

      &:hover {
        filter: brightness(0.7);
      }
    }
  }
`