import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const TopBar: React.FC = () => {
  const [subTitle, setSubTitle] = useState('/images/subtitle_home.png')
  const location = useLocation()
  useEffect(() => {
    const path = location.pathname.substr(1)
    setSubTitle('/images/subtitle_'.concat(path===""?"home":path).concat('.png'))
  }, [location])
  return (
    <StyledTopBar>
      <MainTitle />
      <SubTitle src={subTitle} />
    </StyledTopBar>
  )
}

const StyledTopBar = styled.div`
  height: 300px;
  width: 100%;
  background-image: url('/images/header.png');
  background-size: 100% 100%;
  position: relative;
  z-index: 1;
  @media (max-width: 968px) {
    background-size: auto 100%;
    background-position: center;
    padding-top: 65px;
  }
`
const MainTitle = styled.img.attrs((props) => ({ src: '/images/maintitle.png' }))`
  width: 900px;
  margin: 0 auto;
  display: block;
`
const SubTitle = styled.img`
  width: 360px;
  margin: 0 auto;
  display: block;
`

export default TopBar
