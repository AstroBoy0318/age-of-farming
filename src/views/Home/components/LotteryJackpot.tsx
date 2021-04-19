import React from 'react'
import { Text } from '@pizzafinance/ui-sdk'
import { useWallet } from "@binance-chain/bsc-use-wallet"
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from 'hooks/useTickets'
import { TranslateString } from '../../../utils/translateTextHelpers'

const LotteryJackpot = () => {
  const lotteryPrizeAmount = useTotalRewards()
  const { account } = useWallet()

  if (!account) {
    return (
      <Text color="black" style={{ lineHeight: '30px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }
  return (
    <Text bold fontSize="20px" style={{color:'#7f080e'}}>
      {getBalanceNumber(lotteryPrizeAmount).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}
    </Text>    
  )
}

export default LotteryJackpot
