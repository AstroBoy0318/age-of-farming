import BigNumber from 'bignumber.js'
import React, { useCallback, useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image } from '@pizzafinance/ui-sdk'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import StyledButton from 'components/StyledButton'
import { useERC20 } from 'hooks/useContract'
import { usePastaApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { usePastaStake } from 'hooks/useStake'
import { usePastaUnstake } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePastaHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import OldPastaTitle from './OldPastaTitle'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'

interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    pastaId,
    image,
    tokenName,
    earnToken,
    stakingTokenName,
    stakingTokenAddress,
    projectLink,
    harvest,
    apy,
    tokenDecimals,
    poolCategory,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
  } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWallet()
  const block = useBlock()
  const { onApprove } = usePastaApprove(stakingTokenContract, pastaId)
  const { onStake } = usePastaStake(pastaId, isBnbPool)
  const { onUnstake } = usePastaUnstake(pastaId)
  const { onReward } = usePastaHarvest(pastaId, isBnbPool)

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const isOldPasta = stakingTokenName === QuoteToken.PASTA
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingTokenName} />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={stakingTokenName} />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  const {colors} = useContext(ThemeContext)

  return (
    <Card isActive={isCardActive} isFinished={isFinished && pastaId !== 0}>
      {isFinished && pastaId !== 0 && <PoolFinishedSash />}
      <div style={{ padding: '24px 13% 0 10%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1,display: "flex" }}>
            <Image src={`/images/tokens/${image || tokenName}.png`} width={64} height={64} alt={tokenName} />
            <CardTitle isFinished={isFinished && pastaId !== 0} style={{marginTop: "0.5em",marginLeft: "1em"}}>
              {isOldPasta && '[OLD]'} {tokenName} {TranslateString(348, 'Pool')}
            </CardTitle>
          </div>
        </div>
        <div style={{fontFamily:"Por Siempre Gti",display: "flex"}}>
          <div style={{flex: 1,textAlign: 'center',marginBottom: "10%"}}>
            {!isOldPasta ? (
              <BalanceAndCompound>
                <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} color={colors.primary} style={{flex: 1}}/>
                {pastaId === 0 && account && harvest && (
                  <div style={{flex: 1}}>
                    <HarvestButton
                      disabled={!earnings.toNumber() || pendingTx}
                      text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(999, 'Compound')}
                      onClick={onPresentCompound}
                    />
                  </div>
                )}
              </BalanceAndCompound>
            ) : (
              <OldPastaTitle hasBalance={accountHasStakedBalance} />
            )}
            <div style={{display: "flex"}}>
              <Label isFinished={isFinished && pastaId !== 0} text={TranslateString(330, `${earnToken} earned`)} style={{fontSize: "20px",flex: 1}}/>

              {account && harvest && !isOldPasta && (
                <div style={{flex:1}}>
                  <HarvestButton
                    disabled={!earnings.toNumber() || pendingTx}
                    text={pendingTx ? 'Collecting' : 'Harvest'}
                    onClick={async () => {
                      setPendingTx(true)
                      await onReward()
                      setPendingTx(false)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <StyledCardActions>
          {!account && <UnlockButton />}
          {account &&
            (needsApproval && !isOldPasta ? (
                <StyledButton disabled={isFinished || requestedApproval} onClick={handleApprove} className="imgBtn">
                  {`Approve ${stakingTokenName}`}
                </StyledButton>
            ) : (
              <>
                <StyledButton
                    disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                    onClick={
                      isOldPasta
                        ? async () => {
                            setPendingTx(true)
                            await onUnstake('0')
                            setPendingTx(false)
                          }
                        : onPresentWithdraw
                    }                  
                >
                  {`Unstake ${stakingTokenName}`}
                </StyledButton>
                <StyledActionSpacer />
                {!isOldPasta && (
                  <IconButton disabled={isFinished && pastaId !== 0} onClick={onPresentDeposit} style={{marginTop: "10px"}}>
                    <AddIcon color="#f3c901" />
                  </IconButton>
                )}
              </>
            ))}
        </StyledCardActions>
        <StyledDetails  style={{fontFamily:"Por Siempre Gti",fontSize: "20px"}}>
          <div style={{ flex: 1 }}>{TranslateString(352, 'APY')}:</div>
          {isFinished || isOldPasta || !apy || apy?.isNaN() || !apy?.isFinite() ? (
            '-'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
          )}
        </StyledDetails>
        <StyledDetails style={{fontFamily:"Por Siempre Gti",fontSize: "20px"}}>
          <div style={{ flex: 1,lineHeight:"1.5" }}>
            <span role="img" aria-label={stakingTokenName}>
               {' '}
            </span>
            {TranslateString(384, 'Your Stake')}:
          </div>
          <Balance fontSize="20px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} color={colors.primary} style={{ flex: 1,textAlign:'right'}}/>
        </StyledDetails>
      </div>
      <CardFooter
        projectLink={projectLink}
        totalStaked={totalStaked}
        tokenName={tokenName}
        blocksRemaining={blocksRemaining}
        isFinished={isFinished}
        blocksUntilStart={blocksUntilStart}
        poolCategory={poolCategory}
      />
      <BottomBar/>
    </Card>
  )
}

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
  margin-top: 0px;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  font-size: 14px;
`
const BottomBar = ()=>{
  return (<img alt="bottom" style={{width: "100%",position: "absolute",left: "0",bottom: "-25px"}} src='/images/cardbackbottom_farm.png'/>);
}

export default PoolCard
