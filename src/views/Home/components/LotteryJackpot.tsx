import React from 'react'
import { Text } from '@pizzafinance/ui-sdk'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from 'hooks/useTickets'

const LotteryJackpot = () => {
  const lotteryPrizeAmount = useTotalRewards()

  return (
    <Text bold fontSize="20px" style={{color:'#7f080e'}}>
      {getBalanceNumber(lotteryPrizeAmount).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}
    </Text>    
  )
}

export default LotteryJackpot
