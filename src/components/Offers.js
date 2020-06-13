import React from // , { useContext }
'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import OfferItem from './OfferItem';
// import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider';

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
  // const dispatch = useContext(GlobalDispatchContext);
  // const state = useContext(GlobalStateContext);

  const data = useStaticQuery(graphql`
    {
      allMdx {
        nodes {
          id
          frontmatter {
            company
            image {
              publicURL
            }
            new
            featured
            position
            role
            level
            postedAt
            contract
            location
            languages
            tools
          }
        }
      }
    }
  `);

  const { allMdx } = data;

  const items = allMdx.nodes.map((item) => <OfferItem key={item.id} item={item.frontmatter} />);

  return <OffersWrapper>{items}</OffersWrapper>;
};

export default Offers;
