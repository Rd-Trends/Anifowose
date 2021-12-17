import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const getPosts = async () => {
  const result = await client.query({
    query: gql`
      query getMusicAndPosts {
        posts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            title
            slug
            date
            excerpt
            featuredImage {
              node {
                mediaItemUrl
                title
              }
            }
          }
        }
        allMusic(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            title
            slug
            date
            featuredImage {
              node {
                mediaItemUrl
                title
              }
            }
          }
        }
      }
    `,
  });

  return {
    recentNews: result.data.posts.nodes,
    recentMusic: result.data.allMusic.nodes,
  };
};

export const getPost = async (type, slug) => {
  switch (type) {
    case "post":
      const post = await client.query({
        query: gql`
          query getPostBySlug($slug: String) {
            postBy(slug: $slug) {
              content
              date
              id
              modified
              title
              postId
              commentCount
              tags {
                nodes {
                  name
                  tagId
                }
              }
              comments {
                nodes {
                  content
                  author {
                    node {
                      name
                    }
                  }
                  date
                  commentedOn {
                    node {
                      date
                    }
                  }
                }
              }
              excerpt(format: RAW)
              featuredImage {
                node {
                  mediaItemUrl
                  title
                }
              }
              date
              seo {
                title
                metaDesc
                opengraphDescription
                opengraphType
                opengraphTitle
                opengraphImage {
                  mediaItemUrl
                }
                opengraphSiteName
                opengraphImage {
                  mediaItemUrl
                }
                metaKeywords
              }
            }
          }
        `,
        variables: { slug },
      });

      return post.data.postBy;
      break;

    case "music":
      const music = await client.query({
        query: gql`
          query getPostBySlug($slug: String) {
            musicBy(slug: $slug) {
              content
              date
              id
              modified
              title
              musicId
              commentCount
              comments {
                nodes {
                  content
                  author {
                    node {
                      name
                    }
                  }
                  date
                  commentedOn {
                    node {
                      date
                    }
                  }
                }
              }
              tags {
                nodes {
                  name
                  tagId
                }
              }
              excerpt(format: RAW)
              featuredImage {
                node {
                  mediaItemUrl
                  title
                }
              }
              seo {
                title
                metaDesc
                opengraphDescription
                opengraphType
                opengraphTitle
                opengraphImage {
                  mediaItemUrl
                }
                opengraphSiteName
                opengraphImage {
                  mediaItemUrl
                }
                metaKeywords
              }
            }
          }
        `,
        variables: { slug },
      });

      return music.data.musicBy;
  }
};

export const getPostSlugs = async (type) => {
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
  }
};

export const getMediaItemById = async (id) => {
  const result = await client.query({
    query: gql`
      query getMediaItemById($id: ID) {
        mediaItemBy(id: $id) {
          mediaItemUrl
        }
      }
    `,
    variables: { id },
  });

  return result.data.mediaItemBy.mediaItemUrl;
};
