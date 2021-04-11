import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pizzafinance/ui-sdk'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import PizzaHarvestBalance from './PizzaHarvestBalance'
import PizzaWalletBalance from './PizzaWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  // background-image: url('/images/cardBack.png');
  background-repeat: no-repeat;
  background-position: 87% 35%;
  background-size:32% 40%;
  background-color:rgba(73,4,118,0.6);
  min-height: 350px;
  text-align: center;
`

const Block = styled.div`
  margin-bottom: 50px;
`

const CardImage = styled.img`
  margin-bottom: 5px;
`

const Label = styled.div`
  color: #d2155e;
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Left = styled.div`
  width: 50%;
`

const Right = styled.div`
  width: 50%;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="lg" mb="24px"  color="#d2155e" style={{marginBottom:15}}>
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
        <CardImage src="/images/cardBack.png" alt="Safetrip logo" width={120} height={120} />
        <Block>
          <Row>
            <Left>
              <Label>{TranslateString(544, 'TRIP to Harvest')}</Label>
              <PizzaHarvestBalance />              
            </Left>
            <Right>
              <Label>{TranslateString(546, 'TRIP in Wallet')}</Label>
              <PizzaWalletBalance />              
            </Right>
          </Row>
        </Block>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}              
              onClick={harvestAllFarms}
              fullWidth
            >
              {pendingTx
                ? TranslateString(548, 'Collecting TRIP')
                : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
