import React, { useState, useEffect, useRef } from "react";
import { Card } from "../components/modules/Card/index";
import { getAllMusic, getMusicGenres } from "../queries/music";
import { Button } from "../components/elements/Button/index";
import { Input } from "../components/elements/FormElements/index";
import { AiOutlineSearch } from "react-icons/ai";
import Seo from "../components/layout/Seo";
import Style from "../styles/CardSections.module.css";
import buttonStyle from "../styles/Button.module.css";
import { filterCategories } from "../utils/filterCategories";

const Music = ({ posts, categories }) => {
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState(""); //used for pagination, reference to the last value
  const [pagePosts, setPagePosts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState([]);

  const searchRef = useRef(null);

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    setGenres(() => filterCategories(categories));
  }, [categories]);

  useEffect(() => {
    setHasNextPage(posts.pageInfo.hasNextPage);
    setEndCursor(posts.pageInfo.endCursor);
    setPagePosts(posts.edges);
  }, [posts.pageInfo.hasNextPage, posts.pageInfo.endCursor, posts.edges]);

  const updatePost = async () => {
    let updatedPostsData;
    if (isSearching) {
      updatedPostsData = await getAllMusic(8, endCursor, searchTerm);
    } else {
      updatedPostsData = await getAllMusic(8, endCursor, null);
    }

    const updatedPosts = updatedPostsData.edges;
    setPagePosts((prevPagePosts) => [...prevPagePosts, ...updatedPosts]);
    setHasNextPage(updatedPostsData.pageInfo.hasNextPage);
    setEndCursor(updatedPostsData.pageInfo.endCursor);
  };

  const getSearchedPosts = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    const searchedPostsData = await getAllMusic(8, null, searchTerm);
    const searchedPosts = searchedPostsData.edges;
    setPagePosts(searchedPosts);
    setHasNextPage(searchedPostsData.pageInfo.hasNextPage);
    setEndCursor(searchedPostsData.pageInfo.endCursor);
  };

  const handleSearchTermChange = () => {
    setSearchTerm(searchRef.current.value);
  };

  const CheckIfPageHasData = () => {
    if (isSearching && pagePosts.length <= 0) {
      return (
        <p>No result for the search term, try searching with another term.</p>
      );
    } else if (hasNextPage && !isSearching) {
      return (
        <Button
          className={buttonStyle.btn_primary}
          handleClick={updatePost}
          style={{ paddingTop: "5rem" }}
        >
          Load More...
        </Button>
      );
    } else {
      return <p>No more post to load...</p>;
    }
  };

  const Genres = () => {
    return (
      <div className={Style.genreSection}>
        {genres.map((genre) => {
          return (
            <a href={`/posts/category/${genre.slug}`} key={genre.name}>
              {genre.name}
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Seo url={url} />
      <article className={Style.container}>
        <Genres />
        <div className={Style.titleAndSearchSection}>
          <h1>Music</h1>
          <form>
            <Input
              type="search"
              name="Search Posts"
              placeholder="Search...."
              isRequired={true}
              handleChange={handleSearchTermChange}
              inputRef={searchRef}
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
            let { slug, title, featuredImage, postType } = node;
            return (
              <Card
                key={slug}
                title={title}
                slug={slug}
                page="music"
                featuredImage={featuredImage?.node?.mediaItemUrl}
                buttonText="Download"
                altText={featuredImage?.node?.title}
                postType={postType.type}
              />
            );
          })}
        </div>
        <div style={{ paddingTop: "2rem" }}>
          <CheckIfPageHasData />
        </div>
      </article>
    </>
  );
};

export default Music;

export async function getStaticProps({ params }) {
  const posts = await getAllMusic(8, null, null);
  const categories = await getMusicGenres();

  return {
    props: {
      posts,
      categories,
    },
    revalidate: 10, //keep updating every ten seconds
  };
}
