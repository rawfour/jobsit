import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Map from '../components/Map';
import Offers from '../components/Offers';
import Filters from '../components/Filters';

const mapOptions = {
  center: { lat: 52, lng: 18 },
  zoom: 6,
  scrollwheel: true,
  mapTypeControl: false,
  streetViewControl: false,
};

const PageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const OffersWrapper = styled.div`
  position: relative;

  flex-basis: 100%;
  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-basis: 50%;
  }
`;

const FiltersWrapper = styled.div`
  position: relative;
  flex-basis: 100%;
  min-height: 115px;
  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-basis: 50%;
    order: 2;
  }
`;

const IndexPage = ({ theme }) => {
  const isDesktop = useMediaQuery({
    query: theme.breakpoints.lg,
  });

  return (
    <PageWrapper>
      <FiltersWrapper>
        <Filters />
        {isDesktop && <Map options={mapOptions} />}
      </FiltersWrapper>
      <OffersWrapper>
        <Offers />
      </OffersWrapper>
    </PageWrapper>
  );
};

IndexPage.propTypes = {
  theme: PropTypes.shape().isRequired,
};

export default withTheme(IndexPage);
