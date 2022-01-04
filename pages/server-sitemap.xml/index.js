import { getServerSideSitemap } from "next-sitemap";
import { gql } from "@apollo/client";
import { client } from "../../lib/apollo";

//return an empty page, so next.js won't complain
export default () => {};

const getPosts = async () => {
  const result = await client.query({
    query: gql`
      query getMusicAndPosts {
        allMusic {
          nodes {
            slug
            modified
          }
        }
        posts {
          nodes {
            slug
            modified
          }
        }
      }
    `,
  });

  return [...result.data.posts.nodes, ...result.data.allMusic.nodes];
};

export async function getServerSideProps(context) {
  const posts = await getPosts();

  const fields = posts.map((post) => ({
    loc:
      post.__typename === "Music"
        ? `https://omoanifowose.com/music/${post.slug}`
        : `https://omoanifowose.com/posts/${post.slug}`,
    lastmod: post.modified,
  }));
  return getServerSideSitemap(context, fields);
}
