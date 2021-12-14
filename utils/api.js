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
