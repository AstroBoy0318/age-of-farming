import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, useModal } from '@pizzafinance/ui-sdk'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useLotteryAllowance } from 'hooks/useAllowance'
import { useLotteryApprove } from 'hooks/useApprove'
import useTickets from 'hooks/useTickets'
import useTokenBalance from 'hooks/useTokenBalance'
import { getPizzaAddress } from 'utils/addressHelpers'
import BuyTicketModal from './BuyTicketModal'
import MyTicketsModal from './UserTicketsModal'
import PurchaseWarningModal from './PurchaseWarningModal'

const CardActions = styled.div`
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  & > button{
    width: 100%;
  }    
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
    display: flex;
  }
`

const TicketCard: React.FC = () => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const TranslateString = useI18n()
  const allowance = useLotteryAllowance()
  const { onApprove } = useLotteryApprove()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const pizzaBalance = useTokenBalance(getPizzaAddress())

  const tickets = useTickets()
  const ticketsLength = tickets.length
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={tickets} from="buy" />)
  const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  const [onPresentBuy] = useModal(<BuyTicketModal max={pizzaBalance} tokenName="PIZZA" />)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
      onPresentApprove()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, onPresentApprove])

  const renderLotteryTicketButtons = () => {
    if (!allowance.toNumber()) {
      return (
        <>
          <Button fullWidth disabled className="imgBtn">
            {TranslateString(432, 'View your tickets')}
          </Button>
          <Button fullWidth disabled={requestedApproval} onClick={handleApprove} className="imgBtn">
            {TranslateString(999, 'Approve AOF')}
          </Button>
        </>
      )
    }
    return (
      <>
        <Button
          style={{ marginRight: '8px' }}
          fullWidth
          disabled={ticketsLength === 0}
          variant="secondary"
          onClick={onPresentMyTickets}
          className="imgBtn"
        >
          {TranslateString(432, 'View your tickets')}
        </Button>
        <Button id="lottery-buy-start" fullWidth onClick={onPresentBuy} className="imgBtn">
          {TranslateString(430, 'Buy ticket')}
        </Button>
      </>
    )
  }

  return (
    <CardActions>
      {lotteryHasDrawn ? (
        <div style={{textAlign:"center",width: "100%"}}>
          <Button disabled className="imgBtn" style={{margin: "0 auto"}}> {TranslateString(999, 'On sale')}</Button>
        </div>
      ) : (
        renderLotteryTicketButtons()
      )}
    </CardActions>
  )
}

export default TicketCard
