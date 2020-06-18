import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import InfoWindow from './InfoWindow';

const MarkerWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;

const StyledMarker = styled.button`
  border-radius: 100%;
  width: 100%;
  height: 100%;
  border: none;
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

const CopanyMarker = ({ stack, activeFilters, offerInfo }) => {
  const [infoWindow, setInfoWindow] = useState(false);

  const handleClick = () => {
    setInfoWindow(!infoWindow);
  };

  let icon = stack;

  if (activeFilters.languages) {
    icon = stack.filter((item) => activeFilters.languages.includes(item));
  }

  return (
    <MarkerWrapper>
      <StyledMarker icon={icon[0]} onClick={handleClick} />
      <InfoWindow offerInfo={offerInfo} active={infoWindow} />
    </MarkerWrapper>
  );
};

CopanyMarker.propTypes = {
  stack: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeFilters: PropTypes.shape().isRequired,
  offerInfo: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ activeFilters }) => {
  return {
    activeFilters,
  };
};

export default connect(mapStateToProps, null)(CopanyMarker);
