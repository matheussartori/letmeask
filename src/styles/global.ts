import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.colors.background};
    color: #29292E;
  }

  body, input, button, textarea {
    font: 400 16px 'Roboto', sans-serif;
  }
`
