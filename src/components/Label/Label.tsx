import React from 'react'
import styled from 'styled-components'

interface LabelProps {
  text?: string
  isFinished?: boolean,
  style?: any
}

const Label: React.FC<LabelProps> = ({ text, isFinished = false,style }) => (
  <StyledLabel isFinished={isFinished} style={style}>{text}</StyledLabel>
)

const StyledLabel = styled.div<{ isFinished: boolean }>`
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'primary']};
  font-size: 14px;
`

export default Label
