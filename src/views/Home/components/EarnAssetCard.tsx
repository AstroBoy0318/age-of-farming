import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pizzafinance/ui-sdk'
import { NavLink } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 320px;
  height: 160px;
  text-align: center;
  border-radius: 0px;
  background-image: url('/images/smallcard2_back.png');
  background-size: 100% 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    max-width: none;
  }
  text-align: center;
  & *{
    font-family: "Trajan Pro";
    font-weight: bold;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'lg' })`
  font-size: 1.5em;
  width: 7em;
  margin: 0 auto;
  margin-top: 5px;
`
const EarnAssetCard = () => {
  const latestPools: Pool[] = orderBy(pools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 2)

  // Always include PIZZA
  const assets = ['PIZZA', ...latestPools.map((pool) => pool.tokenName)].join(', ')

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="black" size="sm" style={{marginTop: '5px'}}>
          Earn
        </Heading>        
        <CardMidContent color="#7f080e">Age of Farming</CardMidContent>
          <Heading color="black" size="sm" style={{marginTop: '15px'}}>
            in Pools
          </Heading>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
