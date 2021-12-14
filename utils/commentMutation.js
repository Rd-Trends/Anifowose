import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const createComment = async ({
  content,
  commentOn,
  author,
  authorEmail,
}) => {
  const commentMutation = gql`
    mutation createComment(
      $content: String!
      $author: String
      $authorEmail: String
      $commentOn: Int!
    ) {
      createComment(
        input: {
          content: $content
          commentOn: $commentOn
          author: $author
          authorEmail: $authorEmail
        }
      ) {
        success
        comment {
          approved
          commentId
          content
        }
      }
    }
  `;

  const result = await client.mutate({
    mutation: commentMutation,
    variables: { author, authorEmail, content, commentOn },
  });

  console.log(result.data);
  return result.data;
};
