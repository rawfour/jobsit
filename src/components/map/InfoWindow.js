import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const InfoWindowWrapper = styled.div`
  position: absolute;
  bottom: calc(100% + 20px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 220px;
  height: auto;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.basic};
  padding: 15px 10px;
  z-index: 2;
  cursor: auto;
  opacity: 0;
  overflow: hidden;
  transition: 0.2s;
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${({ theme }) => theme.colors.white};
  }
  ${({ isActive }) =>
    isActive &&
    css`
      overflow: visible;
      opacity: 1;
    `}
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 30%;
`;

const Logo = styled.img`
  width: 70%;
`;

const InfoWrapper = styled.div`
  flex-basis: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Company = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.s};
`;

const Role = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.m};
  transition: 0.2s;
`;

const InfoWindow = ({ offerInfo, active }) => {
  const { company, image, role } = offerInfo;

  return (
    <InfoWindowWrapper isActive={active}>
      <LogoWrapper>
        <Logo src={image.publicURL} />
      </LogoWrapper>
      <InfoWrapper>
        <Company>{company}</Company>
        <Role>{role}</Role>
      </InfoWrapper>
    </InfoWindowWrapper>
  );
};

InfoWindow.propTypes = {
  offerInfo: PropTypes.shape().isRequired,
  active: PropTypes.bool.isRequired,
};

export default InfoWindow;
