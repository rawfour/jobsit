import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  position: relative;
  padding-left: 8px;
  margin-bottom: 20px;
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 10px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.primary};
    z-index: -1;
  }
`;

const SectionTile = ({ children }) => {
  return <Title>{children}</Title>;
};

SectionTile.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SectionTile;
