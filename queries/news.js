import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const getNews = async (first, after, search) => {
  const post = await client.query({
    query: gql`
      query GET_PAGINATED_POSTS($first: Int, $after: String, $search: String) {
        posts(
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

  return post.data.posts;
};
