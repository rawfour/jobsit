import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 80px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgorund};
  color: ${({ theme }) => theme.colors.textInverse};
`

const WebTitle = styled.span`
  margin-right: 60px;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  & span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const LeftSide = styled.ul`
  display: flex;
`

const RightSide = styled.ul`
  display: flex;
`

const MenuItem = styled.li`
  margin-right: 30px;
  transition: 0.1s;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Navigation = () => {
  return (
    <Nav>
      <WebTitle>
        <Link to="/">
          jobs<span>IT</span>
        </Link>
      </WebTitle>
      <Menu>
        <LeftSide>
          <MenuItem>
            <Link to="/">Job offers</Link>
          </MenuItem>
        </LeftSide>

        <RightSide>
          <MenuItem>
            <Link to="/login">Sign in</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/register">Sign up</Link>
          </MenuItem>
        </RightSide>
      </Menu>
    </Nav>
  )
}

export default Navigation
