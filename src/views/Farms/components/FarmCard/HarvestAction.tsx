import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, Text } from '@pizzafinance/ui-sdk'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import styled from 'styled-components'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestButton = styled(Button)`
  background: url('/images/${({ disabled, color, theme }) => (disabled ? 'harvestbtn_back.png' : 'farmunlockbtn_back.png')}') !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat;
  padding-top: 5px;
  box-shadow: none;
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)

  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance.toLocaleString()

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center" style={{marginTop: "-5px"}}>
      <Heading color={rawEarningsBalance === 0 ? 'primary' : 'primary'} style={{fontFamily:"Por Siempre Gti", fontSize:"24px", marginTop: "1em"}}>{displayBalance}</Heading>
      <HarvestButton
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
        style={{marginTop: "-10px"}}
      >
        {TranslateString(999, 'Harvest')}
      </HarvestButton>
    </Flex>
  )
}

export default HarvestAction
