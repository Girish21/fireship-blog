import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }

  & section {
    width: 80%;
    margin-right: 1rem;

    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  }

  & aside {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 20%;
    min-width: 250px;
    text-align: center;
    position: sticky;
    top: 80px;
    height: 0;
    min-height: 300px;

    @media only screen and (max-width: 768px) {
      width: 100%;
      position: relative;
    }
  }
`
