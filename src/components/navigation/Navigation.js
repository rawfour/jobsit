import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link, useStaticQuery, graphql } from 'gatsby';
import withContext from '../../hoc/withContext';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 80px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  background-image: url(${({ bg }) => bg.mobile.publicURL});
  background-repeat: no-repeat;
  background-size: cover;
  @media ${({ theme }) => theme.breakpoints.lg} {
    background-image: url(${({ bg }) => bg.desktop.publicURL});
  }
  ${({ special }) =>
    special &&
    css`
      padding: 0 40px 100px 40px;
      height: 180px;
      background-image: url(${({ bg }) => bg.desktop.publicURL});
      @media ${({ theme }) => theme.breakpoints.lg} {
        padding: 0 40px;
        height: 80px;
      }
    `};
`;

const WebTitle = styled.span`
  margin-right: 30px;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  & span {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  @media ${({ theme }) => theme.breakpoints.sm} {
    margin-right: 60px;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LeftSide = styled.ul`
  display: flex;
`;

const RightSide = styled.ul`
  display: flex;
`;

const MenuItem = styled.li`
  margin-right: 30px;
  transition: 0.2s;
  font-size: ${({ theme }) => theme.fontSizes.m};
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Navigation = ({ context, pathname }) => {
  const data = useStaticQuery(graphql`
    {
      desktop: file(name: { eq: "bg-header-desktop" }) {
        publicURL
      }
      mobile: file(name: { eq: "bg-header-mobile" }) {
        publicURL
      }
    }
  `);

  const {
    state: { specialLayout },
    updateValue,
  } = context;

  useEffect(() => {
    if (pathname === '/' && !specialLayout) {
      updateValue({ specialLayout: true });
    } else if (pathname !== '/' && specialLayout) {
      updateValue({ specialLayout: false });
    }
  });

  return (
    <Nav special={specialLayout} bg={data}>
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

        <RightSide />
      </Menu>
    </Nav>
  );
};

Navigation.propTypes = {
  pathname: PropTypes.string.isRequired,
  context: PropTypes.shape().isRequired,
};

export default withContext(Navigation);
