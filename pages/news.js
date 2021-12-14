import React, { useState, useEffect } from "react";
import { Card } from "../components/modules/Card/index";
import { getPaginatedPosts } from "../utils/paginatedQuery";
import Layout from "../components/layout/index";
import { Button } from "../components/elements/Button/index";
import Seo from "../components/layout/Seo";
import Style from "../styles/CardSections.module.css";
import buttonStyle from "../styles/Button.module.css";

const Music = ({ posts }) => {
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState(""); //used for pagination, reference to the last value
  const [pagePosts, setPagePosts] = useState([]);

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    setHasNextPage(posts.pageInfo.hasNextPage);
    setEndCursor(posts.pageInfo.endCursor);
    setPagePosts(posts.edges);
  }, [posts.pageInfo.hasNextPage, posts.pageInfo.endCursor, posts.edges]);

  const updatePost = async () => {
    const updatedPostsData = await getPaginatedPosts("posts", 8, endCursor);
    const updatedPosts = updatedPostsData.edges;
    setPagePosts((prevPagePosts) => [...prevPagePosts, ...updatedPosts]);
    setHasNextPage(updatedPostsData.pageInfo.hasNextPage);
    setEndCursor(updatedPostsData.pageInfo.endCursor);
  };

  return (
    <Layout>
      <Seo url={url} />
      <article className={Style.container}>
        <h1>News</h1>
        <div className={Style.cardWrapper}>
          {pagePosts.map((post) => {
            const { node } = post;
            let { excerpt, date, slug, title, featuredImage } = node;
            return (
              <Card
                key={slug}
                excerpt={excerpt}
                title={title}
                slug={slug}
                page="posts"
                featuredImage={featuredImage.node.mediaItemUrl}
                altText={featuredImage.node.title}
                buttonText="Read More..."
              />
            );
          })}
        </div>
        <div style={{ paddingTop: "2rem" }}>
          {hasNextPage ? (
            <Button
              className={buttonStyle.btn_primary}
              handleClick={updatePost}
              style={{ paddingTop: "5rem" }}
            >
              Load More...
            </Button>
          ) : (
            <p>No more posts to load...</p>
          )}
        </div>
      </article>
    </Layout>
  );
};

export default Music;

export async function getStaticProps({ params }) {
  const posts = await getPaginatedPosts("posts", 8, null);

  return {
    props: {
      posts,
    },
    revalidate: 10, //keep updating every ten seconds
  };
}
