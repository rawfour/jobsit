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
