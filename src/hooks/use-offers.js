import { useStaticQuery, graphql } from 'gatsby';

export const useOffers = () => {
  const { allMdx } = useStaticQuery(
    graphql`
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
      }
    `,
  );

  return allMdx;
};
