import React, { useEffect, useState } from "react";
import { Card } from "../../../components/modules/Card/index";
import Seo from "../../../components/layout/Seo";
import Style from "../../../styles/CardSections.module.css";
import { getTaxonomy } from "../../../queries/taxonomy";
import { getSlugs } from "../../../queries/slugs";
import Link from "next/link";

const PostPage = ({ category, categoryTitle }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const compare = (a, b) => {
    if (a.modified < b.modified) {
      return -1;
    }
    if (a.modified > b.modified) {
      return 1;
    }
    return 0;
  };

  const linkStyle = {
    display: "block",
    color: "var(--secondary)",
    padding: "0.5rem 1rem 0rem",
  };

  return (
    <>
      <Seo url={url} />
      <main className={Style.container}>
        {category.length > 0 ? (
          <>
            <div
              style={{
                textAlign: "left",
                marginBottom: "1rem",
                color: "var(--primary)",
                textTransform: "uppercase",
              }}
            >
              <h1>Category: {categoryTitle}</h1>
            </div>
            <div className={Style.cardWrapper}>
              {category.sort(compare).map((item) => {
                let { slug, title, featuredImage, postType, page } = item;
                return (
                  <Card
                    key={slug}
                    title={title}
                    slug={slug}
                    page={page}
                    featuredImage={featuredImage?.node?.mediaItemUrl}
                    buttonText={page === "music" ? "Download" : "Read More..."}
                    altText={featuredImage?.node?.title}
                    postType={postType.type}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            <p>No posts or music for this category !!</p>
            <Link href="/music">
              <a style={linkStyle}>Go to music page</a>
            </Link>

            <Link href="/news">
              <a style={linkStyle}>Go to NEWS page</a>
            </Link>
          </>
        )}
      </main>
    </>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const categorySlugs = await getSlugs("categories");
  const paths = categorySlugs.map((category) => ({
    params: {
      slug: category.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const data = await getTaxonomy("category", params.slug);
  const music =
    data && data.music
      ? data.music.nodes.map((node) => ({ ...node, page: "music" }))
      : [];
  const posts =
    data && data.posts
      ? data.posts.nodes.map((node) => ({ ...node, page: "posts" }))
      : [];
  const category = [...posts, ...music];

  return {
    props: {
      category,
      categoryTitle: params.slug,
    },
    revalidate: 10,
  };
}
