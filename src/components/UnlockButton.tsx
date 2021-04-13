import React from 'react'
import { Button, useWalletModal } from '@pizzafinance/ui-sdk'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  const { className } = props;

  return (
    <Button onClick={onPresentConnectModal} {...props} style={className === 'imgBtn'?{}:{background:"url(/images/farmunlockbtn_back.png)",backgroundSize: '100% 100%',boxShadow: 'none', padding: '35px 30px',fontSize: "14px",paddingTop:"45px",marginTop:"-5px"}}>
      {TranslateString(292, 'Unlock Wallet')}
    </Button>
  )
}

export default UnlockButton
