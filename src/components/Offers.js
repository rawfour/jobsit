import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useOffers } from '../hooks/use-offers';
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

const Offers = ({ activeFilters }) => {
  const { nodes } = useOffers();

  const allOffers = nodes;
  let newOfferList = allOffers;

  if (Object.keys(activeFilters).length !== 0) {
    Object.keys(activeFilters).forEach((key, index) => {
      if (index === 0) {
        newOfferList = allOffers.filter((offer) => {
          let addOffer = false;

          if (typeof offer.frontmatter[key] === 'object') {
            addOffer = offer.frontmatter[key].some((item) => activeFilters[key].includes(item));
          } else {
            addOffer = activeFilters[key].includes(offer.frontmatter[key]);
          }

          return addOffer;
        });
      } else {
        newOfferList = newOfferList.filter((offer) => {
          let addOffer = false;

          if (typeof offer.frontmatter[key] === 'object') {
            addOffer = offer.frontmatter[key].some((item) => activeFilters[key].includes(item));
          } else {
            addOffer = activeFilters[key].includes(offer.frontmatter[key]);
          }

          return addOffer;
        });
      }
    });
  }

  const items = newOfferList.map((item) => <OfferItem key={item.id} item={item.frontmatter} />);

  return <OffersWrapper activeFilters={activeFilters}>{items}</OffersWrapper>;
};

Offers.propTypes = {
  activeFilters: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ activeFilters }) => {
  return {
    activeFilters,
  };
};

export default connect(mapStateToProps, null)(Offers);
