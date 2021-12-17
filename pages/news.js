import React, { useState, useEffect, useRef } from "react";
import { Card } from "../components/modules/Card/index";
import {
  getPaginatedPosts,
  getPaginatedSearchPosts,
} from "../utils/paginatedQuery";
import { Input } from "../components/elements/FormElements/index";
import { AiOutlineSearch } from "react-icons/ai";
import Layout from "../components/layout/index";
import { Button } from "../components/elements/Button/index";
import Seo from "../components/layout/Seo";
import Style from "../styles/CardSections.module.css";
import buttonStyle from "../styles/Button.module.css";

const Music = ({ posts }) => {
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState(""); //used for pagination, reference to the last value
  const [pagePosts, setPagePosts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const postSearchRef = useRef(null);

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
    let updatedPostsData;
    if (isSearching) {
      updatedPostsData = await getPaginatedSearchPosts(
        "posts",
        8,
        endCursor,
        searchTerm
      );
    } else {
      updatedPostsData = await getPaginatedPosts("posts", 8, endCursor);
    }
    const updatedPosts = updatedPostsData.edges;
    setPagePosts((prevPagePosts) => [...prevPagePosts, ...updatedPosts]);
    setHasNextPage(updatedPostsData.pageInfo.hasNextPage);
    setEndCursor(updatedPostsData.pageInfo.endCursor);
  };

  const getSearchedPosts = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    const searchedPostsData = await getPaginatedSearchPosts(
      "posts",
      8,
      null,
      searchTerm
    );
    const searchedPosts = searchedPostsData.edges;
    setPagePosts(searchedPosts);
    setHasNextPage(searchedPostsData.pageInfo.hasNextPage);
    setEndCursor(searchedPostsData.pageInfo.endCursor);
  };

  const handleSearchTermChange = () => {
    setSearchTerm(postSearchRef.current.value);
  };

  return (
    <Layout>
      <Seo url={url} />
      <article className={Style.container}>
        <div className={Style.titleAndSearchSection}>
          <h1>News</h1>
          <form>
            <Input
              type="search"
              name="Search Posts"
              placeholder="Search...."
              isRequired={true}
              handleChange={handleSearchTermChange}
              inputRef={postSearchRef}
            />
            <Button
              className={buttonStyle.btn_iconBtn}
              handleClick={getSearchedPosts}
              label="search"
            >
              {<AiOutlineSearch />}
            </Button>
          </form>
        </div>
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
                featuredImage={featuredImage?.node.mediaItemUrl}
                altText={featuredImage?.node?.title}
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
