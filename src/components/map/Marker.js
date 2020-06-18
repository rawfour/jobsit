import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledMarker = styled.div`
  border-radius: 100%;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.basic};

  cursor: pointer;
  ${({ icon }) =>
    icon &&
    css`
      background-image: url(${`/icons/${icon}.svg`});
      background-position: center;
      background-size: 30px 30px;
      background-repeat: no-repeat;
    `}
`;

const Marker = ({ stack }) => {
  return <StyledMarker icon={stack[0]} />;
};

Marker.propTypes = {
  stack: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Marker;
