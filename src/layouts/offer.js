import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import ContextConsumer from '../context';

const OfferWrapper = styled.div`
  padding: 20px;
`;

export const query = graphql`
  query querySingleOffer($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      id
      frontmatter {
        slug
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
        street
        street_number
        coordinates {
          lat
          lng
        }
        languages
        tools
      }
    }
  }
`;

const OfferLayout = ({
  data: {
    mdx: { frontmatter },
  },
}) => (
  <ContextConsumer>
    {({ data }) => (
      <OfferWrapper>
        <h1>{frontmatter.company}</h1>
        <span>{frontmatter.role}</span>
      </OfferWrapper>
    )}
  </ContextConsumer>
);

OfferLayout.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default OfferLayout;
