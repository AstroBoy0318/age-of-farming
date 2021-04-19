import React from 'react'
import { Card, CardBody, Heading, Text } from '@pizzafinance/ui-sdk'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance, useDcashPerBlock} from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getPizzaAddress, getMasterChefAddress } from 'utils/addressHelpers'

import CardValue from './CardValue'

const StyledPizzaStats = styled(Card)`
  text-align: center;
  border-radius: 0;
  width: min( 365px, 100% ) !important;
  background-color:rgba(0,0,0,1);
  margin-top: 0px;
  margin-left: 0;
  height: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: max-content;
    margin-top: 50px;
  }
  & *{
    font-family: "Trajan Pro";
    font-weight: bold;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #f4dfab;
  & *{
    color: #f4dfab !important;
  }
`

const PizzaStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance()
  // const pizzaSupply = totalSupply && burnedBalance ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const pizzaSupply = totalSupply && burnedBalance ? getBalanceNumber(totalSupply) : 0
  const burnedAmount = burnedBalance? getBalanceNumber(burnedBalance) : 0;
  const dcashPerBlock = useDcashPerBlock();
  const showBlock = dcashPerBlock ? getBalanceNumber(dcashPerBlock) : 0;
  return (
    <StyledPizzaStats>
      <CardBody style={{padding: "24px 10px",paddingBottom: "5px"}}>
        <Heading size="lg" mb="24px" color="#ceac27">
          {TranslateString(534, 'Age of Farming Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px" color="#f4dfab">{TranslateString(536, 'Total Age of Farming Supply')}</Text>
          {pizzaSupply && <CardValue fontSize="14px" value={pizzaSupply} />}
        </Row>
          <Row>
          <Text fontSize="14px" color="#f4dfab">{TranslateString(538, 'Total Age of Farming Burned')}</Text>
          {burnedAmount && <CardValue fontSize="14px" value={burnedAmount} />}
        </Row>
        <Row>
          <Text fontSize="14px" color="#f4dfab">{TranslateString(540, 'New Age of Farming/block')}</Text>
          {showBlock && <CardValue fontSize="14px" value={showBlock} />}
        </Row>
      </CardBody>
    </StyledPizzaStats>
  )
}

export default PizzaStats
