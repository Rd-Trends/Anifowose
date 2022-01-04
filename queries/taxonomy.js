import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const getTaxonomy = async (type, slug) => {
  const tag = await client.query({
    query: gql`
      query GET_TAG_OR_CATEGORY($slug: ID!) {
        ${type}(id: $slug, idType: SLUG) {
          name
          music {
            nodes {
              slug
              title
              modified
              postType {
                type
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
          posts {
            nodes {
              slug
              title
              modified
              postType {
                type
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    `,
    variables: { slug },
    fetchPolicy: "no-cache",
  });

  return tag.data[`${type}`];
};
