import styled, { css } from 'styled-components'

export const Container = styled.div`
  main {
    @media only screen and (max-width: 967px) {
      padding: 0 30px;
    }

    max-width: 800px;
    margin: 0 auto;

    .room-title {
      margin: 32px 0 24px;
      display: flex;
      align-items: center;

      h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 24px;
        color: ${props => props.theme.colors.text};
      }

      span {
        margin-left: 16px;
        background: #e559f9;
        border-radius: 9999px;
        padding: 8px 16px;
        color: #fff;
        font-weight: 500;
        font-size: 14pz;
      }
    }

    form {
      textarea {
        width: 100%;
        border: 0;
        padding: 16px;
        border-radius: 8px;
        background: ${props => props.theme.colors.feature};
        color: ${props => props.theme.colors.text};
        ${props =>
          props.theme.title === 'light'
            ? css`
                box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
              `
            : css`
                box-shadow: 0 2px 12px rgba(255, 255, 255, 0.04);
              `};
        resize: vertical;
        min-height: 130px;
      }

      .form-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;

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
            color: ${props => props.theme.colors.text};
            font-weight: 500;
            font-size: 14px;
          }
        }

        > span {
          font-size: 14px;
          color: #737380;
          font-weight: 500;

          button {
            background: transparent;
            border: 0;
            color: #835afd;
            text-decoration: underline;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          }
        }
      }
    }

    .question-list {
      margin: 32px 0;
    }

    .empty-questions {
      margin-top: 56px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;

      h3 {
        margin-top: 8px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 18px;
        color: ${props => props.theme.colors.text};
      }

      p {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        max-width: 280px;
        text-align: center;
        color: ${props => props.theme.colors.text};
      }
    }
  }
`
