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

import { useWallet } from '@binance-chain/bsc-use-wallet'
import BuyModal from 'views/Lottery/components/TicketCard/BuyTicketModal'
import PizzaWinnings from './PizzaWinnings'
import LotteryJackpot from './LotteryJackpot'
import UnlockButton from '../../../components/UnlockButton'

const StyledLotteryCard = styled(Card)`
  background-image: url('/images/cardback_home.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 5px 0;
  border-radius: 0;
  text-align: center;
  width: auto !important;
  margin-left: 0;
  height: 360px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 320px;
    width: calc(200% - 365px) !important;
    margin-left: calc(-100% + 365px);
  }
  & *{
    font-family: "Trajan Pro";
    font-weight: bold;
  }
`
const Block = styled.div`
 margin-top: 1em;
`
const CardImage = styled.img`
  box-shadow: -8px 8px 0 0 rgba(201,157,55,0.4);
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
`
const Actions = styled.div`
 display: flex;
 margin-top: 24px;
 button {
   flex: 1 0 50%;
 }
 @media (max-width: 768px) {
  display: block;
 }
 `
 const Row = styled.div`
  display: flex;
  flex-direction: row;
`
const Left = styled.div`
  padding-top: 5%;
  width: 30%;
`
const Center = styled.div`
  width: 40%;
`
const Right = styled.div`
  padding-top: 5%;
  width: 30%;
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
  const { account } = useWallet()


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
        <Heading mb="20px" color="#7f080e" style={{width: "min(100%,14em)", margin: "0 auto", marginTop: '1em' }}>
          {TranslateString(550, 'Age of Farming lottery desk')}
        </Heading>
        <Block>
          <Row>
            <Left>
              <PizzaWinnings />
              <Label>{TranslateString(552, 'Age of Farming to Collect')}</Label>
            </Left>
            <Center>
              <CardImage src="/images/ticket-bg.png" alt="SafeTrip lottery logo"/>
            </Center>
            <Right>
              <LotteryJackpot />
              <Label>{TranslateString(554, 'Total jackpot this round')}:</Label>
            </Right>
          </Row>
        </Block>
      <Actions>
        {account ? (
          <>
            <Button
              id="dashboard-collect-winnings"
              disabled={getBalanceNumber(claimAmount) === 0 || requesteClaim}
              onClick={handleClaim}
              style={{ marginRight: '8px' }}
              className="imgBtn"
            >
              {TranslateString(556, 'Collect Winnings')}
            </Button>
             <Button id="dashboard-buy-tickets" variant="primary" onClick={onPresentBuy} disabled={lotteryHasDrawn} className="imgBtn">
            {/* <Button id="dashboard-buy-tickets" disabled={lotteryHasDrawn} className="imgBtn"> */}
              {TranslateString(558, 'Buy Tickets')}
            </Button>
          </>
          ):(
            <div style={{margin:"0 auto"}}>
              <UnlockButton className="imgBtn"/>
            </div>
          )}
      </Actions>
      </CardBody>
    </StyledLotteryCard>
  )
}

export default FarmedStakingCard
