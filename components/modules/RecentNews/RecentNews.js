import React from "react";
import Link from "next/link";
import { Card } from "../Card/index";
import Style from "../../../styles/CardSections.module.css";

const RecentMusic = ({ posts }) => {
  return (
    <article className={Style.container}>
      <h1 className={Style.heading}>Recent News</h1>
      <div className={Style.cardWrapper}>
        {posts?.map((post) => {
          // let { excerpt, date, slug, title, featuredImage } = post;
          return (
            <Card
              key={post?.slug}
              excerpt={post?.excerpt}
              title={post?.title}
              slug={post?.slug}
              page="posts"
              featuredImage={post?.featuredImage?.node?.mediaItemUrl}
              altText={post?.featuredImage?.node?.title}
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
