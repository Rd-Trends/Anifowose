import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const getAllMusic = async (first, after, search) => {
  const result = await client.query({
    query: gql`
      query GET_PAGINATED_POSTS($first: Int, $after: String, $search: String) {
        allMusic(
          first: $first
          after: $after
          where: { search: $search, orderby: { field: DATE, order: DESC } }
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              excerpt
              title
              slug
              date
              postType {
                type
              }
              featuredImage {
                node {
                  mediaItemUrl
                  title
                }
              }
            }
          }
        }
      }
    `,
    variables: { first, after, search },
    fetchPolicy: "no-cache",
  });

  return result.data.allMusic;
};

export const getMusicGenres = async () => {
  const result = await client.query({
    query: gql`
      query getGenres {
        categories {
          nodes {
            name
            slug
          }
        }
      }
    `,
    fetchPolicy: "no-cache",
  });

  return result.data.categories.nodes;
};
