import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const updateComments = async (type, Id) => {
  switch (type) {
    case "post":
      const post = await client.query({
        query: gql`
          query getPostById($Id: Int) {
            postBy(postId: $Id) {
              comments {
                nodes {
                  content
                  author {
                    node {
                      name
                    }
                  }
                  commentedOn {
                    node {
                      date
                    }
                  }
                }
              }
            }
          }
        `,
        fetchPolicy: "no-cache",
        variables: { Id },
      });

      return post.data.postBy;
      break;

    case "music":
      const music = await client.query({
        query: gql`
          query getPostById($Id: Int) {
            musicBy(musicId: $Id) {
              comments {
                nodes {
                  content
                  author {
                    node {
                      name
                    }
                  }
                  commentedOn {
                    node {
                      date
                    }
                  }
                }
              }
            }
          }
        `,
        fetchPolicy: "no-cache",
        variables: { Id },
      });

      return music.data.musicBy;
  }
};
