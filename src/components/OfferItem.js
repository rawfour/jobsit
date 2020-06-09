import React from "react"
import styled from "styled-components"

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-gap: 15px;
  list-style: none;
  padding: 15px 15px 15px 20px;
  border-left: 5px solid yellow;
  border-radius: 10px;
`

const StyledWrapperLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLogo = styled.img`
  display: block;
`

const StyledInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`

const StyledTitle = styled.h3`
  flex-basis: 100%;
  margin-bottom: 5px;
  font-size: ${({ theme }) => theme.fontSizes.s};
`

const StyledLocation = styled.span`
  flex-basis: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const StyledLevel = styled.span`
  flex-basis: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const StyledSalary = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  flex-basis: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 10px;
`

const OfferItem = ({ item }) => {
  return (
    <StyledListItem>
      <StyledWrapperLogo>
        <StyledLogo src={item.logo} alt={item.title} />
      </StyledWrapperLogo>
      <StyledInfoWrapper>
        <StyledTitle>{item.title}</StyledTitle>
        <StyledLocation>{item.location}</StyledLocation>
        <StyledLevel>{item.level}</StyledLevel>
        <StyledSalary>{item.salary}</StyledSalary>
      </StyledInfoWrapper>
    </StyledListItem>
  )
}

export default OfferItem
