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
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Text)`  
  margin-left: 4px;
  margin-top: 5px; 
  font-color: #ff66ff;
  font-size: 13px; 
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
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px" style={{color:'#4c84c1'}}>{lpLabel}</Heading>
        {/* <Flex justifyContent="center" paddingTop="5px"> */}
          {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}          
          {(farmImage==="bnb-busd") || (farmImage==="usdt-busd") || (farmImage==="btcb-bnb") || (farmImage==="eth-bnb") ? <MultiplierTag>Deposit Tax 4%</MultiplierTag> : <MultiplierTag>No Deposit Tax</MultiplierTag>}                
          
          {/* <MultiplierTag>Withdrawal Tax 5%</MultiplierTag> */}
          {/* <MultiplierTag variant="secondary">{multiplier}</MultiplierTag> */}
        {/* </Flex> */}
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
