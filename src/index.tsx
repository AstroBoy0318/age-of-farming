import ReactDOM from 'react-dom'
import React from 'react'
import styled from 'styled-components'
import App from './App'
import Providers from './Providers'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height:100vh;
`
ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <Container>
       <App /> 
      </Container>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
