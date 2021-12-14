import React from "react";
import Link from "next/link";
import { Card } from "../Card/index";
import Style from "../../../styles/CardSections.module.css";

const RecentMusic = ({ posts }) => {
  return (
    <article className={Style.container}>
      <h1>Recent News</h1>
      <div className={Style.cardWrapper}>
        {posts.map((post) => {
          let { excerpt, date, slug, title, featuredImage } = post;
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
      <div className={Style.seeMoreLink}>
        <Link href="/news" passHref>
          <a>More News...</a>
        </Link>
      </div>
    </article>
  );
};

export default RecentMusic;
