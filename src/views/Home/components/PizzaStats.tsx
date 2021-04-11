import React from 'react'
import { Card, CardBody, Heading, Text } from '@pizzafinance/ui-sdk'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance, useDcashPerBlock} from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getPizzaAddress, getMasterChefAddress } from 'utils/addressHelpers'

import CardValue from './CardValue'

const StyledPizzaStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background-color:rgba(73,4,118,0.6);
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
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
      <CardBody>
        <Heading size="xl" mb="24px" color="#d2155e">
          {TranslateString(534, 'TRIP Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px" color="#b1aeae">{TranslateString(536, 'Total TRIP Supply')}</Text>
          {pizzaSupply && <CardValue fontSize="14px" value={pizzaSupply} />}
        </Row>
          <Row>
          <Text fontSize="14px" color="#b1aeae">{TranslateString(538, 'Total TRIP Burned')}</Text>
          {burnedAmount && <CardValue fontSize="14px" value={burnedAmount} />}
        </Row>
        <Row>
          <Text fontSize="14px" color="#b1aeae">{TranslateString(540, 'New TRIP/block')}</Text>
          {showBlock && <CardValue fontSize="14px" value={showBlock} />}
        </Row>
      </CardBody>
    </StyledPizzaStats>
  )
}

export default PizzaStats
