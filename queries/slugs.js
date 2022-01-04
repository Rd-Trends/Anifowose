import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const getSlugs = async (type) => {
  switch (type) {
    case "posts":
      const postSlugs = await client.query({
        query: gql`
          query getPostSlug {
            posts {
              nodes {
                slug
              }
            }
          }
        `,
      });
      return postSlugs.data.posts.nodes;
      break;

    case "music":
      const musicSlugs = await client.query({
        query: gql`
          query getPostSlug {
            allMusic {
              nodes {
                slug
              }
            }
          }
        `,
      });
      return musicSlugs.data.allMusic.nodes;

    case "tags":
      const tagSlugs = await client.query({
        query: gql`
          query getTagSlugs {
            tags {
              nodes {
                slug
              }
            }
          }
        `,
      });
      return tagSlugs.data.tags.nodes;

    case "categories":
      const categorySlugs = await client.query({
        query: gql`
          query getTagSlugs {
            categories {
              nodes {
                slug
              }
            }
          }
        `,
      });
      return categorySlugs.data.categories.nodes;
  }
};
