import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '@pizzafinance/ui-sdk'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { useFarms, usePriceBnbBusd, usePricePizzaBusd, usePriceBusdBnb, usePriceCakeBnb, usePriceEthBnb } from 'state/hooks'
import { BLOCKS_PER_YEAR, PIZZA_PER_BLOCK, PIZZA_POOL_PID } from 'config'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 320px;
  height: 160px;
  text-align: center;
  border-radius: 0px;
  background-image: url('/images/smallcard_back.png');
  background-size: 100% 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    max-width: none;
  }
  & *{
    font-family: "Trajan Pro";
    font-weight: bold;
  }
`

const CardMidContent = styled(Heading).attrs({ size: 'lg' })`
  line-height: 1.1em;
`
const EarnAPYCard = () => {
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const bnbPrice = usePriceBnbBusd()
  const pizzaPrice = usePricePizzaBusd()
  const BusdBnb = usePriceBusdBnb()
  const CakeBnb = usePriceCakeBnb()
  const EthBnb = usePriceEthBnb()

  const maxAPY = useRef(Number.MIN_VALUE)

  const getHighestAPY = () => {
    const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')

    calculateAPY(activeFarms)

    return (maxAPY.current * 100).toLocaleString('en-US').slice(0, -1)
  }

  const calculateAPY = useCallback(
    (farmsToDisplay) => {
      const pizzaPriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === PIZZA_POOL_PID)?.tokenPriceVsQuote || 0)

      farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const pizzaRewardPerBlock = PIZZA_PER_BLOCK.times(farm.poolWeight)
        const pizzaRewardPerYear = pizzaRewardPerBlock.times(BLOCKS_PER_YEAR)

        let tmp = new BigNumber(1);
        if(farm.quoteTokenSymbol === QuoteToken.BUSD) tmp = tmp.times(BusdBnb)
        if(farm.quoteTokenSymbol === QuoteToken.CAKE) tmp = tmp.times(CakeBnb)
        if(farm.quoteTokenSymbol === QuoteToken.ETH) tmp = tmp.times(EthBnb)

        // let apy = pizzaPriceVsBNB.times(pizzaRewardPerYear).div(farm.lpTotalInQuoteToken)
        let apy = pizzaPriceVsBNB.times(pizzaRewardPerYear).div(farm.lpTotalInQuoteToken).div(tmp)


        if (farm.quoteTokenSymbol === QuoteToken.BUSD) {
          apy = pizzaPriceVsBNB.times(pizzaRewardPerYear).div(farm.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.PIZZA) {
          apy = pizzaRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const pizzaApy =
            farm && pizzaPriceVsBNB.times(pizzaRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = pizzaApy && dualApy && pizzaApy.plus(dualApy)
        }

        if (maxAPY.current < apy.toNumber()) maxAPY.current = apy.toNumber()

        return apy
      })
    },
    [bnbPrice, farmsLP, BusdBnb, CakeBnb, EthBnb],
  )

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="black" size="sm">
          Earn up to
        </Heading>
        <CardMidContent color="#7f080e">
          {getHighestAPY() ? (
            `${getHighestAPY()}%`
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardMidContent>
        <CardMidContent color="#7f080e">
          {TranslateString(736, 'APY')}
        </CardMidContent>
        
        <Heading color="black" size="lg" style={{ fontSize: "1.3em", marginTop: "10px"}}>
          in Farms
        </Heading>
          
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPYCard
