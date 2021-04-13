import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image, Text } from '@pizzafinance/ui-sdk'
import { CommunityTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  margin-bottom: 0;
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Text)`  
  margin-left: 4px;
  margin-top: 5px; 
  font-color: #d7ad05;
  font-size: 13px; 
  font-family: Trajan Pro;
  width: 100%;
  text-align: right;
`
const RedBlock = styled.span`
  background: url('/images/redblock_back.jpg');
  border-radius: 15px;
  padding: 5px 10px;
  box-shadow: -1px 1px 0 0 black;
`
const BlackBlock = styled.span`
  background: url('/images/blackblock_back.jpg');
  border-radius: 15px;
  padding: 5px 10px;
  box-shadow: -1px 1px 0 0 black;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  farmImage,
  tokenSymbol,
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image src={`/images/farms/${farmImage}.png`} alt={tokenSymbol} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-start" style={{width: '100%'}}>
        <Heading mb="4px" style={{color:'#7f080e', fontFamily: "Trajan Pro"}}>{lpLabel}</Heading>
        {/* <Flex justifyContent="center" paddingTop="5px"> */}
          {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}          
        {(farmImage==="bnb-busd") || (farmImage==="usdt-busd") || (farmImage==="btcb-bnb") || (farmImage==="eth-bnb") ? <MultiplierTag><RedBlock>Deposit Tax</RedBlock> <BlackBlock>4%</BlackBlock></MultiplierTag> : <MultiplierTag><RedBlock>No Deposit Tax</RedBlock></MultiplierTag>}
          
          {/* <MultiplierTag>Withdrawal Tax 5%</MultiplierTag> */}
          {/* <MultiplierTag variant="secondary">{multiplier}</MultiplierTag> */}
        {/* </Flex> */}
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
