import React from 'react';
import styled from 'styled-components';
import OfferItem from './OfferItem';
import data from '../assets/data.json';

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

const Offers = () => {
  const items = data.map((item) => <OfferItem key={item.id} item={item} />);

  return <OffersWrapper>{items}</OffersWrapper>;
};

export default Offers;
