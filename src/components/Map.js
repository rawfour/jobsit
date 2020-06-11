import { functions, isEqual, omit } from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MapWrapper = styled.div`
  height: calc(100vh - 280px);
  @media ${({ theme }) => theme.breakpoints.xl} {
    height: calc(100vh - 230px);
  }
  @media ${({ theme }) => theme.breakpoints.xxxl} {
    height: calc(100vh - 180px);
  }
`;

function Map({ options, onMount, className, onMountProps }) {
  const ref = useRef();
  const [map, setMap] = useState();

  useEffect(() => {
    // The Google Maps API modifies the options object passed to
    // the Map constructor in place by adding a mapTypeId with default
    // value 'roadmap'. { ...options } prevents this by creating a copy.
    const onLoad = () => setMap(new window.google.maps.Map(ref.current, { ...options }));
    if (!window.google) {
      const script = document.createElement(`script`);
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GMAPS_API_KEY}`;
      document.head.append(script);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    }
    return onLoad();
  }, [options]);

  if (map && typeof onMount === `function`) onMount(map, onMountProps);

  return <MapWrapper {...{ ref, className }} />;
}

function shouldNotUpdate(props, nextProps) {
  const [funcs, nextFuncs] = [functions(props), functions(nextProps)];
  const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs));
  const noFuncChange =
    funcs.length === nextFuncs.length &&
    funcs.every((fn) => props[fn].toString() === nextProps[fn].toString());
  return noPropChange && noFuncChange;
}

Map.propTypes = {
  options: PropTypes.shape(),
  onMount: PropTypes.func,
  className: PropTypes.shape(),
  onMountProps: PropTypes.func,
};

Map.defaultProps = {
  options: {
    center: { lat: 48, lng: 8 },
    zoom: 5,
  },
  onMount: null,
  className: null,
  onMountProps: null,
};

export default React.memo(Map, shouldNotUpdate);
