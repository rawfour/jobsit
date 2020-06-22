import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import { useOffers } from '../hooks/use-offers';
import Map from '../components/map/Map';
import Offers from '../components/Offers';
import Filters from '../components/Filters';

const mapOptions = {
  center: { lat: 52, lng: 18 },
  zoom: 5,
};

const PageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-wrap: nowrap;
  }
`;

const OffersWrapper = styled.div`
  position: relative;
  flex-basis: 100%;
  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-basis: 50%;
  }
  /* @media ${({ theme }) => theme.breakpoints.xl} {
    flex-basis: 40%;
  } */
`;

const FiltersWrapper = styled.div`
  position: relative;
  flex-basis: 100%;
  min-height: 115px;
  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-basis: 50%;
    order: 2;
  }
  /* @media ${({ theme }) => theme.breakpoints.xl} {
    flex-basis: 60%;
  } */
`;

const IndexPage = ({ theme, activeFilters }) => {
  const isDesktop = useMediaQuery({
    query: theme.breakpoints.lg,
  });

  const { nodes } = useOffers();

  let newOfferList = nodes;

  if (Object.keys(activeFilters).length !== 0) {
    Object.keys(activeFilters).forEach((key, index) => {
      if (index === 0) {
        newOfferList = nodes.filter((offer) => {
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

  return (
    <PageWrapper>
      <FiltersWrapper>
        <Filters />
        {isDesktop && <Map offers={newOfferList} options={mapOptions} />}
      </FiltersWrapper>
      <OffersWrapper>
        <Offers offers={newOfferList} />
      </OffersWrapper>
    </PageWrapper>
  );
};

IndexPage.propTypes = {
  theme: PropTypes.shape().isRequired,
  activeFilters: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ activeFilters }) => {
  return {
    activeFilters,
  };
};

export default connect(mapStateToProps, null)(withTheme(IndexPage));
