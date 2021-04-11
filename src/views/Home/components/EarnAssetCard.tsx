import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pizzafinance/ui-sdk'
import { NavLink } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'

const StyledFarmStakingCard = styled(Card)`
  background: linear-gradient(#480864, #A00963);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 160px;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
  text-align: center;
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 30px;
`
const EarnAssetCard = () => {
  const latestPools: Pool[] = orderBy(pools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 2)

  // Always include PIZZA
  const assets = ['PIZZA', ...latestPools.map((pool) => pool.tokenName)].join(', ')

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="#d2155e" size="lg" style={{fontSize:30, marginBottom:10}}>
          Earn
        </Heading>        
        <CardMidContent color="#b1aeae" style={{ marginBottom:10}}>TRIP</CardMidContent>        
          <Heading color="#d2155e" size="lg">
            in Pools
          </Heading>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
