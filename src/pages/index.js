import React from "react"
import styled from "styled-components"
import Map from "../components/Map"
import Offers from "../components/Offers"
import Filters from "../components/Filters"

const mapOptions = {
  center: { lat: 52, lng: 18 },
  zoom: 6,
  scrollwheel: true,
  mapTypeControl: false,
  streetViewControl: false,
}

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
`

const IndexPage = () => {
  return (
    <PageWrapper>
      <Offers />
      <div>
        <Filters />
        <Map options={mapOptions} />
      </div>
    </PageWrapper>
  )
}
export default IndexPage
