import React, { useContext, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { ThemeContext } from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { ChevronDown, ChevronUp } from 'react-feather'
import Balance from 'components/Balance'
import { CommunityTag, CoreTag, BinanceTag } from 'components/Tags'
import { PoolCategory } from 'config/constants/types'
import { Link } from '@pizzafinance/ui-sdk'

const tags = {
  [PoolCategory.BINANCE]: BinanceTag,
  [PoolCategory.CORE]: CoreTag,
  [PoolCategory.COMMUNITY]: CommunityTag,
}

interface Props {
  projectLink: string
  totalStaked: BigNumber
  tokenName: string
  blocksRemaining: number
  isFinished: boolean
  blocksUntilStart: number
  poolCategory: PoolCategory
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled2' : 'primary2']};
  padding: 0 24px;
`

const StyledDetailsButton = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  height: 32px;
  justify-content: center;
  outline: 0;
  padding: 0;
  &:hover {
    opacity: 0.9;
  }

  & > svg {
    margin-left: 4px;
  }
`

const Details = styled.div`
  margin-top: 10px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
`

const FlexFull = styled.div`
  flex: 1;
`
const Label = styled.div`
  font-size: 20px;
  font-family: Por Siempre Gti;
`
const TokenLink = styled.a`
  font-size: 22px;
  text-decoration: none;
  font-family: "Por Siempre Gti";
  display: flex;
  width: 100%;
  justify-content: center;
  text-shadow:0 0 3px #cd8d35,0 0 3px #cd8d35,0 0 3px #cd8d35,0 0 3px #cd8d35,0 0 3px #cd8d35,0 0 3px #cd8d35;
  margin: 10px 0;
`
const DownArrow = ()=>{
  return (
    <img src='/images/downarrow.png' alt='arrow' style={{margin:"0 20px"}}/>
  );
}

const CardFooter: React.FC<Props> = ({
  projectLink,
  totalStaked,
  tokenName,
  blocksRemaining,
  isFinished,
  blocksUntilStart,
  poolCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const Icon = isOpen ? ChevronUp : ChevronDown

  const handleClick = () => setIsOpen(!isOpen)
  const Tag = tags[poolCategory]
  const {colors} = useContext(ThemeContext)

  return (
    <StyledFooter isFinished={isFinished}>
      <Row>
        {/* <FlexFull> */}
        {/*  <Tag /> */}
        {/* </FlexFull> */}
        <StyledDetailsButton onClick={handleClick} style={{color:"black",width: "100%"}}>
          <DownArrow/>
          {isOpen ? 'Hide' : 'Details'}
          <DownArrow/>
        </StyledDetailsButton>
      </Row>
      {isOpen && (
        <Details style={{fontFamily: "Por Siempre Gti", paddingBottom: "5px"}}>
          <Row>
            <FlexFull style={{flex:1}}>
              <Label>
                <span role="img" aria-label="pasta">
                  {' '}
                </span>
                {TranslateString(408, 'Total Stake of')} {tokenName}:
              </Label>
            </FlexFull>
            <Balance fontSize="20px" isDisabled={isFinished} value={getBalanceNumber(totalStaked)} color={colors.primary} style={{flex:1,textAlign:"right"}}/>
          </Row>
          {blocksUntilStart > 0 && (
            <Row>
              <FlexFull style={{flex:1}}>
                <Label>{TranslateString(410, 'Start')}:</Label>
              </FlexFull>
              <Balance fontSize="14px" isDisabled={isFinished} value={blocksUntilStart} decimals={0} style={{flex:1,textAlign:"right"}}/>
            </Row>
          )}
          {blocksUntilStart === 0 && blocksRemaining > 0 && (
            <Row>
              <FlexFull style={{flex:1}}>
                <Label>{TranslateString(410, 'End Block of Stake')}:</Label>
              </FlexFull>
              <Balance fontSize="14px" isDisabled={isFinished} value={blocksRemaining} decimals={0} style={{flex:1,textAlign:"right"}}/>
            </Row>
          )}
          <TokenLink href={projectLink} target="_blank">
            {TranslateString(412, 'View project site')}
          </TokenLink>
        </Details>
      )}
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
