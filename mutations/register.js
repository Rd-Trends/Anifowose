import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const registerUser = async ({
  email,
  password,
  username,
  clientMutationId,
}) => {
  const REGISTER_USER = gql`
    mutation registerUser(
      $clientMutationId: String!
      $email: String!
      $username: String!
      $password: String!
    ) {
      registerUser(
        input: {
          clientMutationId: $clientMutationId
          username: $username
          email: $email
          password: $password
        }
      ) {
        clientMutationId
        user {
          databaseId
          email
          name
          id
          jwtAuthToken
        }
      }
    }
  `;

  const result = await client.mutate({
    mutation: REGISTER_USER,
    variables: { email, username, password, clientMutationId },
  });

  return result.data;
};
