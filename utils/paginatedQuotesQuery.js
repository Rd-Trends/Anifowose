import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const getQuotes = async (first, after) => {
  const quotes = await client.query({
    query: gql`
      query GET_PAGINATED_QUOTES($first: Int, $after: String) {
        quotes(
          first: $first
          where: { orderby: { field: DATE, order: DESC } }
          after: $after
        ) {
          pageInfo {
            hasNextPage
            endCursor
            hasPreviousPage
            startCursor
          }
          edges {
            cursor
            node {
              image {
                quoteImage {
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
  });

  return quotes.data.quotes;
};
