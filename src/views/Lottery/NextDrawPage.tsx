import React from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BaseLayout } from '@pizzafinance/ui-sdk'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalClaim } from 'hooks/useTickets'
import YourPrizesCard from './components/YourPrizesCard'
import UnlockWalletCard from './components/UnlockWalletCard'
import TicketCard from './components/TicketCard'
import TotalPrizesCard from './components/TotalPrizesCard'
import WinningNumbers from './components/WinningNumbers'
import HowItWorks from './components/HowItWorks'

const Cards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 12;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const SecondCardColumnWrapper = styled.div<{ isAWin?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isAWin ? 'column' : 'column-reverse')};
`

const NextDrawPage: React.FC = () => {
  const { account } = useWallet()
  const { claimAmount } = useTotalClaim()
  const winnings = getBalanceNumber(claimAmount)
  const isAWin = winnings > 0

  return (
    <>
      <Cards>
        <div>
          <TotalPrizesCard />
        </div>
        <div>
          <HowItWorks />
          {/* legacy page content */}
          <WinningNumbers />
        </div>
        <SecondCardColumnWrapper isAWin={isAWin} style={{backgroundImage:'url(/images/lotteryback.png)',backgroundSize: '100% 100%'}}>
          {!account ? (
            <UnlockWalletCard />
          ) : (
            <>
              <YourPrizesCard />
              <TicketCard isSecondCard={isAWin} />
            </>
          )}
        </SecondCardColumnWrapper>
      </Cards>
    </>
  )
}

export default NextDrawPage
