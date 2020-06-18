import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import Marker from './Marker';

const MapWrapper = styled.div`
  height: calc(100vh - 280px);
  position: relative;
  @media ${({ theme }) => theme.breakpoints.xl} {
    height: calc(100vh - 230px);
  }
  @media ${({ theme }) => theme.breakpoints.xxxl} {
    height: calc(100vh - 180px);
  }
`;

const Map = ({ offers }) => {
  const [initialPosition, setInitialPosition] = useState({
    center: {
      lat: 52.234982,
      lng: 21.00849,
    },
    zoom: 5,
  });

  const handleApiLoaded = (map, maps) => {};

  return (
    <MapWrapper>
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GATSBY_GMAPS_API_KEY }}
          defaultCenter={initialPosition.center}
          defaultZoom={initialPosition.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {offers.map(
            (item) =>
              item.frontmatter.location !== 'Remote' && (
                <Marker
                  key={item.id}
                  lat={item.frontmatter.coordinates.lat}
                  lng={item.frontmatter.coordinates.lng}
                  stack={item.frontmatter.languages || item.frontmatter.rools}
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
};

export default Map;
