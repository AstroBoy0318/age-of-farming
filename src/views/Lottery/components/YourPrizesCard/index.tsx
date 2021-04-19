import React from 'react'
import styled from 'styled-components'
import { Card, CardBody } from '@pizzafinance/ui-sdk'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalClaim } from 'hooks/useTickets'
import PrizesWonContent from './PrizesWonContent'
import NoPrizesContent from './NoPrizesContent'

const StyledCard = styled(Card)`
  background: rgba(243,200,102,0.7);
  margin-bottom: 7%;
  margin-left: 6%;
  margin-right: 4%;
  border: 1px solid ${(props) => props.theme.colors.primary };
  ${(props) =>
    props.isDisabled
      ? `  
        margin-top: 16px;
        box-shadow: unset;

        ${props.theme.mediaQueries.sm} {
          margin-top: 10px;
        }

        ${props.theme.mediaQueries.lg} {
          margin-top: 10px;
        }
        `
      : ``}
`

const YourPrizesCard: React.FC = () => {
  const { claimAmount } = useTotalClaim()

  const winnings = getBalanceNumber(claimAmount)
  const isAWin = winnings > 0

  return (
    <StyledCard isDisabled={!isAWin} isActive={isAWin} color="primary">
      <CardBody>{isAWin ? <PrizesWonContent /> : <NoPrizesContent />}</CardBody>
    </StyledCard>
  )
}

export default YourPrizesCard
