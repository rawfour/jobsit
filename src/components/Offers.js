import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import OfferItem from './OfferItem';

const OffersWrapper = styled.ul`
  position: relative;
  padding: 0 20px;
  top: -50px;
  @media ${({ theme }) => theme.breakpoints.lg} {
    padding: 20px;
    height: calc(100vh - 80px);
    overflow-y: scroll;
    top: auto;
  }
`;

const Offers = ({ offers }) => {
  const items = offers.map((item) => <OfferItem key={item.id} item={item.frontmatter} />);

  return <OffersWrapper>{items}</OffersWrapper>;
};

Offers.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Offers;
