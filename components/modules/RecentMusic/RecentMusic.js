import React from "react";
import Link from "next/link";
import { Card } from "../Card/index";
import Style from "../../../styles/CardSections.module.css";

const RecentMusic = ({ posts }) => {
  return (
    <article className={Style.container}>
      <h1 className={Style.heading}>Recent Music</h1>
      <div className={Style.cardWrapper}>
        {posts?.map((post) => {
          // let { slug, title, featuredImage } = post;
          return (
            <Card
              key={post?.slug}
              title={post?.title}
              slug={post?.slug}
              page="music"
              featuredImage={post?.featuredImage?.node?.mediaItemUrl}
              altText={post?.featuredImage?.node?.title}
              buttonText="Download"
            />
          );
        })}
      </div>
      <div className={Style.seeMoreLink}>
        <Link href="/music" passHref>
          <a>More Music...</a>
        </Link>
      </div>
    </article>
  );
};

export default RecentMusic;
