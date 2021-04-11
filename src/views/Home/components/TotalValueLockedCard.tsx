import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pizzafinance/ui-sdk'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  background-color:rgba(73,4,118,0.6);
  text-align: center;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  const data = useGetStats()
  // const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null
  const totalValue = useTotalValue();

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px" color="#d2155e">
          {TranslateString(762, 'Total Value Locked (TVL)')}
        </Heading>
          <>
            <CardValue fontSize='40px' value={totalValue.toNumber()} prefix="$" decimals={2}/>
            {/* <Heading size="xl" color="#b1aeae">{`$${0}`}</Heading> */}
            <Text color="#d2155e" style={{fontSize:28}}>{TranslateString(764, 'Across all LPs and BUS Pools')}</Text>
          </>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
