import React, { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading, Card, CardBody, CardFooter, Text, PizzaRoundIcon, Flex, Skeleton } from '@pizzafinance/ui-sdk'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { useTotalRewards } from 'hooks/useTickets'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import ExpandableSectionButton from 'components/ExpandableSectionButton/ExpandableSectionButton'
import PrizeGrid from '../PrizeGrid'

const CardHeading = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`

const Right = styled.div`
  display: flex;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const Left = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  margin-right: 16px;
  svg {
    width: 48px;
    height: 48px;
  }
`

const PrizeCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ExpandingWrapper = styled.div<{ showFooter: boolean }>`
  height: ${(props) => (props.showFooter ? '100%' : '100%')};

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 100%;
  }
`

const TotalPrizesCard = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const [showFooter, setShowFooter] = useState(false)
  const lotteryPrizeAmount = +getBalanceNumber(useTotalRewards()).toFixed(0)
  const lotteryPrizeWithCommaSeparators = lotteryPrizeAmount.toLocaleString()
  const { currentLotteryNumber } = useContext(PastLotteryDataContext)
  const { colors } = useContext(ThemeContext)


  return (
    <Card style={{backgroundImage: 'url(/images/cardback_home.png)',backgroundSize: '100% 100%',borderRadius: 0}}>
      <CardBody style={{paddingBottom: 0}}>
        {account && (
          <Flex mb="16px" alignItems="center" justifyContent="space-between" style={{ height: '20px',marginBottom: 0,marginTop: '10px' }}>
            {currentLotteryNumber === 0 && <Skeleton height={20} width={56} />}
            {currentLotteryNumber > 0 && (
              <>
                <Text fontSize="18px" style={{ fontWeight: 600,margin: "0 auto" }} color="primary">{`Round ${currentLotteryNumber}`}</Text>
              </>
            )}
          </Flex>
        )}
        <CardHeading>
          <Left>
            <PrizeCountWrapper>
              <Text fontSize="22px" color="primary" style={{paddingTop: '15px'}}>
                {TranslateString(999, 'Total Pot')}
              </Text>
              <Heading size="lg" style={{color:colors.primary, display:"none"}}>{lotteryPrizeWithCommaSeparators} AOF</Heading>
            </PrizeCountWrapper>
          </Left>
        </CardHeading>
      </CardBody>
      <ExpandingWrapper showFooter={showFooter}>
        <CardFooter style={{border:"none", padding: "10px 50px",paddingBottom: "25px"}}>
          <PrizeGrid lotteryPrizeAmount={lotteryPrizeAmount} />
        </CardFooter>
      </ExpandingWrapper>
    </Card>
  )
}

export default TotalPrizesCard
