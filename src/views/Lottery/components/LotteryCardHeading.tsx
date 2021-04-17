import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Text } from '@pizzafinance/ui-sdk'

interface HeadingProps {
  valueToDisplay?: string
  children?: string
  Icon?: React.ComponentType
}

const IconWrapper = styled.div`
  margin-right: 10%;
  svg {
    width: 48px;
    height: 48px;
  }
`

const LotteryCardHeading: React.FC<HeadingProps> = ({ valueToDisplay, children, Icon, ...props }) => {
  return (
    <Flex {...props}
          style={{justifyContent:"center"}}>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      <Flex flexDirection="column">
        <Text fontSize="14px" color="black" style={{fontFamily:"Por Siempre Gti"}}>
          {children}
        </Text>
        <Heading size="lg" color="black" style={{fontFamily:"Por Siempre Gti"}}>{valueToDisplay}</Heading>
      </Flex>
    </Flex>
  )
}

LotteryCardHeading.defaultProps = {
  valueToDisplay: '',
  Icon: () => <div />,
  children: '',
}

export default LotteryCardHeading
