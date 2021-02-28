import styled from 'styled-components'

const Card = styled.div`
  padding: 2rem;
  margin: 1rem 0;
  background-color: white;
  border: 1px solid var(--color-gray);
  border-radius: 8px;

  & footer {
    display: flex;
  }
`

const CardImageCenter = styled.img`
  width: 20%;
  display: block;
  margin: auto;
  border-radius: 50%;
  max-width: 150px;
`

const CardInfo = styled.div`
  color: white;
  background: var(--color-blue);
`

export { Card, CardImageCenter, CardInfo }
