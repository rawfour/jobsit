import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import styled, { css } from 'styled-components';
import CopanyMarker from './CompanyMarker';
import withContext from '../../hoc/withContext';

const MapWrapper = styled.div`
  height: calc(100vh - 80px);
  position: relative;

  ${({ special }) =>
    special &&
    css`
      height: calc(100vh - 280px);
      @media ${({ theme }) => theme.breakpoints.xl} {
        height: calc(100vh - 230px);
      }
      @media ${({ theme }) => theme.breakpoints.xxxl} {
        height: calc(100vh - 180px);
      }
    `}
`;

const Map = ({
  options,
  offers,
  context: {
    state: { specialLayout },
  },
}) => {
  const handleApiLoaded = (map, maps) => {};

  return (
    <MapWrapper special={specialLayout}>
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GATSBY_GMAPS_API_KEY }}
          defaultCenter={options.center}
          defaultZoom={options.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {offers.map(
            (item) =>
              item.frontmatter.location !== 'Remote' && (
                <CopanyMarker
                  key={item.id}
                  lat={item.frontmatter.coordinates.lat}
                  lng={item.frontmatter.coordinates.lng}
                  stack={item.frontmatter.languages || item.frontmatter.rools}
                  offerInfo={item.frontmatter}
                />
              ),
          )}
        </GoogleMapReact>
      </div>
    </MapWrapper>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  context: PropTypes.shape().isRequired,
  options: PropTypes.shape().isRequired,
};

export default withContext(Map);
