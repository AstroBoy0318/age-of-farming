import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background-image: url(/images/cardback_farms.png);
  background-size: 100% 550px;
  padding: 15px 30px;
  display: flex;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'primary']};
  flex-direction: column;
  position: relative;  
  ${({ theme }) => theme.mediaQueries.sm}{
    padding: 20px 50px;
    background-size: 100% 490px;
  }
`

export default Card
