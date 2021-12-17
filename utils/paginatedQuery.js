import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const getPaginatedPosts = async (type, first, after) => {
  const post = await client.query({
    query: gql`
      query GET_PAGINATED_POSTS(
        $first: Int
        $after: String
      ) {
        ${type}(first: $first, after: $after, where: {orderby: {field: DATE, order: DESC}}) {
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
    variables: { first, after },
    fetchPolicy: "no-cache",
  });

  return post.data[type];
};

export const getPaginatedSearchPosts = async (type, first, after, search) => {
  const post = await client.query({
    query: gql`
      query GET_PAGINATED_SEARCH_POSTS(
        $first: Int
        $after: String
        $search: String
      ) {
        ${type}(first: $first, after: $after, where: {search: $search, orderby: {field: DATE, order: DESC}}) {
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

  return post.data[type];
};
