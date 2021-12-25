import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const signIn = async ({ username, password, clientMutationId }) => {
  const loginMutation = gql`
    mutation login(
      $username: String!
      $password: String!
      $clientMutationId: String
    ) {
      login(
        input: {
          password: $password
          username: $username
          clientMutationId: $clientMutationId
        }
      ) {
        authToken
        clientMutationId
        user {
          databaseId
          email
          id
          jwtAuthToken
          jwtRefreshToken
        }
      }
    }
  `;

  const result = await client.mutate({
    mutation: loginMutation,
    variables: { username, password, clientMutationId },
  });

  return result.data;
};
