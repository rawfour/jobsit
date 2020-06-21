const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const offerTemplate = path.resolve(`src/layouts/offer.js`);
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  const result = await graphql(`
    query queryOffers {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  // Create offer pages.
  result.data.allMdx.nodes.forEach((offer) => {
    // if (page.path.match(/special-page/)) {
    //     page.context.layout = "special"
    //     createPage(page)
    //   }

    createPage({
      // Path for this page — required
      path: `${offer.frontmatter.slug}`,
      component: offerTemplate,
      context: {
        slug: offer.frontmatter.slug,
      },
    });
  });
};
