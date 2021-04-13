import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
// import BigNumber from 'bignumber.js'
import { Text, Flex, Link, LinkExternal } from '@pizzafinance/ui-sdk'
// import { Farm } from 'state/types'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'

export interface TokenAddressesObject {
  56?: string
  97?: string
}

export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  quoteTokenAdresses?: TokenAddressesObject
  quoteTokenSymbol?: string
  tokenAddresses: TokenAddressesObject
}

const Wrapper = styled.div`
  margin-top: 0px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: black;
  display: flex;
  align-items: center;
  font-family: Por Siempre Gti;
  font-size: 20px;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: black;
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
}) => {
  const TranslateString = useI18n()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
//  const lpAddress = getLpAddress()
  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text bold style={{fontFamily: "Por Siempre Gti"}} color="black" fontSize="20px">{TranslateString(316, 'Stake')}:</Text>
        <StyledLinkExternal href={`https://exchange.pancakeswap.finance/#/add/${liquidityUrlPathParts}`}>
          {lpLabel}
        </StyledLinkExternal>
      </Flex>
      {!removed && (
     <Flex justifyContent="space-between">
          <Text color="black" fontSize="20px">{TranslateString(23, ' ')}</Text>
      {/*    <StyledLinkExternal href={`https://info.cheeseswap.app/pair/${tokenAddresses}`}>
            {lpLabel}
          </StyledLinkExternal> */}
        </Flex>
      )}
      <Flex justifyContent="flex-start">
        <Link external href={bscScanAddress} bold style={{fontFamily: "Por Siempre Gti",width:"100%",justifyContent:"center",textShadow:"0 0 3px #cd8d35,0 0 3px #cd8d35,0 0 3px #cd8d35,0 0 3px #cd8d35,0 0 3px #cd8d35,0 0 3px #cd8d35"}} fontSize="22px">
          {TranslateString(356, 'View on BscScan')}
        </Link>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
