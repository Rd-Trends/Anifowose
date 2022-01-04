import React, { useEffect, useState } from "react";
import { Card } from "../../../components/modules/Card/index";
import Seo from "../../../components/layout/Seo";
import Style from "../../../styles/CardSections.module.css";
import { getTaxonomy } from "../../../queries/taxonomy";
import { getSlugs } from "../../../queries/slugs";
import Link from "next/link";

const PostPage = ({ tag, tagTitle }) => {
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
        {tag.length > 0 ? (
          <>
            <div
              style={{
                textAlign: "left",
                marginBottom: "1rem",
                color: "var(--primary)",
                textTransform: "uppercase",
              }}
            >
              <h1>Tag: {tagTitle}</h1>
            </div>
            <div className={Style.cardWrapper}>
              {tag.sort(compare).map((tag) => {
                let { slug, title, featuredImage, postType, page } = tag;
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
            <p>No posts or music for this tag !!</p>
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
  const tagSlugs = await getSlugs("tags");
  const paths = tagSlugs.map((tag) => ({
    params: {
      slug: tag.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const data = await getTaxonomy("tag", params.slug);
  const music =
    data && data.music
      ? data.music.nodes.map((node) => ({ ...node, page: "music" }))
      : [];
  const posts =
    data && data.posts
      ? data.posts.nodes.map((node) => ({ ...node, page: "posts" }))
      : [];
  const tag = [...posts, ...music];

  return {
    props: {
      tag,
      tagTitle: params.slug,
    },
    revalidate: 10,
  };
}
