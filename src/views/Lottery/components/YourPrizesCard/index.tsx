import React from 'react'
import styled from 'styled-components'
import { Card, CardBody } from '@pizzafinance/ui-sdk'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalClaim } from 'hooks/useTickets'
import PrizesWonContent from './PrizesWonContent'
import NoPrizesContent from './NoPrizesContent'

const StyledCard = styled(Card)`
  ${(props) =>
    props.isDisabled
      ? `  
        margin-top: 16px;
        background-color: unset;
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
      <CardBody style={{paddingTop: 0}}>{isAWin ? <PrizesWonContent /> : <NoPrizesContent />}</CardBody>
    </StyledCard>
  )
}

export default YourPrizesCard
