import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button,PizzaTheme, BackgroundImage } from '@pizzafinance/ui-sdk'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import PizzaHarvestBalance from './PizzaHarvestBalance'
import PizzaWalletBalance from './PizzaWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/cardback_home.png');
  background-repeat: no-repeat;
  background-size:100% 100%;
  text-align: center;
  & *{
    font-family: "Trajan Pro";
    font-weight: bold;
  }
`

const Block = styled.div`
  margin-top: -25px;
`

const CardImage = styled.img`
  box-shadow: -10px 10px 0 0 #d69f42;
  border-radius: 50%;
  margin-top: 5px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Left = styled.div`
  width: 45%;
  margin-right: 10%;
`

const Right = styled.div`
  width: 45%;
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
        <Heading size="lg" mb="24px"  color="#7f080e" style={{width: "7em", margin: "0 auto", fontFamily: "Trajan Pro", marginTop: '1em' }}>
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
        <CardImage src="/images/cardBack.png" alt="Safetrip logo" width={70}/>
        <Block>
          <Row>
            <Left>
              <PizzaHarvestBalance />              
              <Label>{TranslateString(544, 'Age of Empires to Harvest')}</Label>
            </Left>
            <Right>
              <PizzaWalletBalance />         
              <Label>{TranslateString(546, 'Age of Empires in Wallet')}</Label>     
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
            <UnlockButton className="imgBtn"/>
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
