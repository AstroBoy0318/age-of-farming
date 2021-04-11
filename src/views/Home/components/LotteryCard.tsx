import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, useModal } from '@pizzafinance/ui-sdk'
import { getPizzaAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import useTokenBalance from 'hooks/useTokenBalance'
import { useMultiClaimLottery } from 'hooks/useBuyLottery'
import { useTotalClaim } from 'hooks/useTickets'

import BuyModal from 'views/Lottery/components/TicketCard/BuyTicketModal'
import PizzaWinnings from './PizzaWinnings'
import LotteryJackpot from './LotteryJackpot'

const StyledLotteryCard = styled(Card)`
  // background-image: url('/images/ticket-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 300px;
  text-align: center;
  background-color:rgba(73,4,118,0.6);
`
const Block = styled.div`
 margin-bottom: 16px;
`
const CardImage = styled.img`
  // margin-top: 10px;
  margin-bottom: 16px;
`
const Label = styled.div`
color: #d2155e;
 font-size: 14px;
`
const Actions = styled.div`
 display: flex;
 margin-top: 24px;
 button {
   flex: 1 0 50%;
 }
 `
 const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Left = styled.div`
  width: 50%;
`

const Right = styled.div`
  width: 50%;
`

const Alert = styled.div`
  font-size: 16px;
  background-color: #307db8;
  display: initial;
  padding: 5px 15px;
  border-radius: 30px;
  color: white;
`

const FarmedStakingCard = () => {
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const [requesteClaim, setRequestedClaim] = useState(false)
  const TranslateString = useI18n()
  const { claimAmount } = useTotalClaim()
  const { onMultiClaim } = useMultiClaimLottery()

  const pizzaBalance = useTokenBalance(getPizzaAddress())


  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true)
      const txHash = await onMultiClaim()
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedClaim(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onMultiClaim, setRequestedClaim])

  const [onPresentBuy] = useModal(<BuyModal max={pizzaBalance} tokenName="TRIP" />)

  return (
    <StyledLotteryCard>
      <CardBody>
        <Heading size="lg" mb="20px" color="#d2155e">
          {TranslateString(550, 'Your Lottery Winnings')}
        </Heading>
        <CardImage src="/images/ticket-bg.png" alt="SafeTrip lottery logo" width={100} height={100} />
        <Block>
          <Row>
            <Left>
              <Label>{TranslateString(552, 'TRIP to Collect')}</Label>
              <PizzaWinnings />
              
            </Left>
            <Right>
              <Label>{TranslateString(554, 'Total jackpot this round')}:</Label>
              <LotteryJackpot />
            </Right>
          </Row>
        </Block>
        <Block>
          <Alert>{TranslateString(554, 'Coming soon')}</Alert>
        </Block>      
      <Actions>
        <Button
          id="dashboard-collect-winnings"
          disabled={getBalanceNumber(claimAmount) === 0 || requesteClaim}
          onClick={handleClaim}
          style={{ marginRight: '8px' }}
        >
          {TranslateString(556, 'Collect Winnings')}
        </Button>
        {/* <Button id="dashboard-buy-tickets" variant="secondary" onClick={onPresentBuy} disabled={lotteryHasDrawn} color="#FFFFFF"> */}
        <Button id="dashboard-buy-tickets" disabled={lotteryHasDrawn} color="#FFFFFF">
          {TranslateString(558, 'Buy Tickets')}
        </Button>
      </Actions>
      </CardBody>
    </StyledLotteryCard>
  )
}

export default FarmedStakingCard
