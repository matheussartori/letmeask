import styled from 'styled-components'

export const Container = styled.header`
  padding: 24px;
  border-bottom: 1px solid ${props => props.theme.colors.trace};

  .content {
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 967px) {
      flex-wrap: wrap;
      justify-content: space-between;
    }

    > a,
    > a img {
      max-height: 45px;

      @media only screen and (max-width: 967px) {
        margin-bottom: 6px;
      }
    }

    > div {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: flex-start;

      button {
        height: 40px;
      }
    }
  }
`
