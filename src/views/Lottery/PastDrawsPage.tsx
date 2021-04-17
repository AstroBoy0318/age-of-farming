import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@pizzafinance/ui-sdk'
import PastLotteryRoundViewer from './components/PastLotteryRoundViewer'
import PastDrawsHistoryCard from './components/PastDrawsHistory/PastDrawsHistoryCard'

const Cards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
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
  flex-direction: column;
`

const BunnyImageWrapper = styled.div`
  display: flex;
  margin-top: 32px;
  justify-content: center;
`

const PastDrawsPage: React.FC = () => {
  return (
    <Cards>
      <div style={{gridColumn: "span 1"}}> </div>
      <PastLotteryRoundViewer />
      <div style={{gridColumn: "span 2"}}> </div>
      <SecondCardColumnWrapper style={{backgroundImage:"url(/images/winninggraph_back.png)",backgroundSize: "100% 100%",padding: "5%",paddingRight: "2%"}}>
        <PastDrawsHistoryCard />
      </SecondCardColumnWrapper>
      <div style={{gridColumn: "span 1"}}> </div>
    </Cards>
  )
}

export default PastDrawsPage
