import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@pizzafinance/ui-sdk'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { BLOCKS_PER_YEAR, PIZZA_PER_BLOCK, PIZZA_POOL_PID } from 'config'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePricePizzaBusd, usePriceBusdBnb, 
  usePriceCakeBnb, usePriceEthBnb } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'

const FarmCards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 8;
    width: 100%;
    margin: 0 auto;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    & > div {
      grid-column: span 12;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: 2/span 10;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    & > div {
      grid-column: span 6;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    & > div {
      grid-column: span 4;
    }
  }
`

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const pizzaPrice = usePricePizzaBusd()
  const bnbPrice = usePriceBnbBusd()
  const BusdBnb = usePriceBusdBnb()
  const CakeBnb = usePriceCakeBnb()
  const EthBnb = usePriceEthBnb()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      const pizzaPriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === PIZZA_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken ) {
          return farm
        }
        const pizzaRewardPerBlock = PIZZA_PER_BLOCK.times(farm.poolWeight)                
        const pizzaRewardPerYear = pizzaRewardPerBlock.times(BLOCKS_PER_YEAR)
                          
        // let apy = pizzaPriceVsBNB.times(pizzaRewardPerYear).div(farm.lpTotalInQuoteToken)
        // const _apy = pizzaPriceVsBNB.times(pizzaRewardPerYear).div(farm.lpTotalInQuoteToken)

        // let apy = pizzaPriceVsBNB.times(pizzaRewardPerYear).div(farm.lpTotalInQuoteToken)
        // const _apy = pizzaPriceVsBNB.times(pizzaRewardPerYear).div(farm.lpTotalInQuoteToken)
        let tmp = new BigNumber(1);
        if(farm.quoteTokenSymbol === QuoteToken.BUSD) tmp = tmp.times(BusdBnb)
        if(farm.quoteTokenSymbol === QuoteToken.CAKE) tmp = tmp.times(CakeBnb)
        if(farm.quoteTokenSymbol === QuoteToken.ETH) tmp = tmp.times(EthBnb)

        // let apy = pizzaPriceVsBNB.times(pizzaRewardPerYear).div(farm.lpTotalInQuoteToken)
        let apy = pizzaPriceVsBNB.times(pizzaRewardPerYear).div(farm.lpTotalInQuoteToken).div(tmp)

        

        // let apy = pizzaPriceVsBNB.times(pizzaRewardPerYear).div(farm.lpTotalInQuoteToken)
        // if(farm.pid > 2){
        //   apy = pizzaPriceVsBNB.times(pizzaRewardPerYear).div(farm.pid)
        // }


        if (farm.quoteTokenSymbol === QuoteToken.USDT || farm.quoteTokenSymbol === QuoteToken.USDC) {
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

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          pizzaPrice={pizzaPrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [bnbPrice, farmsLP, account, pizzaPrice, ethereum, BusdBnb, CakeBnb, EthBnb],
  )

  return (
    <Page style={{backgroundImage: "url(/images/mainback_farms.jpg)"}}>
      {/* <FarmTabButtons /> */}
      <div style={{marginTop: "30px"}}>
        <FarmCards>
          <Route exact path={`${path}`}>
            {farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </FarmCards>
      </div>
    </Page>
  )
}

export default Farms
