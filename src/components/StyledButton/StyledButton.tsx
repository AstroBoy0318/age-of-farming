
import { Button } from '@pizzafinance/ui-sdk'
import styled  from 'styled-components'
import React from 'react'

const StyledButton = styled(Button)`
background:url(/images/${(props)=>props.disabled?'harvestbtn_back':'farmunlockbtn_back'}.png) !important;
background-size: 100% 100% !important;
background-repeat: no-repeat;
box-shadow: none !important;
border: none;
padding: 30px 30px;
padding-top:40px;
font-size: 14px;
`
export default StyledButton