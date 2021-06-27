import { createGlobalStyle } from 'styled-components'

export const GlobalModalStyle = createGlobalStyle`
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }

  .ReactModal__Content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    @media only screen and (max-width: 967px) {
      width: 90%;
      padding: 20px !important;
    }

    svg {
      color: #e73f5d;
      font-size: 56px;
      margin-bottom: 10px;
    }

    h3 {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 24px;
    }

    p {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 16px;
      color: #737380;
    }

    footer {
      margin-top: 40px;

      button {
        border-radius: 8px;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        border: 0;
        cursor: pointer;
        padding: 15px 25px;

        & + button {
          margin-left: 8px;
        }

        &.modal-button-cancel {
          background-color: #dbdcdd;
          color: #737380;
        }

        &.modal-button-confirm {
          color: #fefefe;
          background-color: #e73f5d;
        }
      }
    }
  }
`
