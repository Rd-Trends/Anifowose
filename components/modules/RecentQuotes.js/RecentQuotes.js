import React from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "../../../styles/CardSections.module.css";

const RecentQuotes = ({ quotes }) => {
  return (
    <article className={Style.container}>
      <h1 className={Style.heading}>Be Motivted!</h1>
      <div className={Style.cardWrapper}>
        {quotes?.map((post) => {
          const { node } = post;
          let { title, mediaItemUrl } = node?.image?.quoteImage;
          return (
            <Image
              key={title}
              alt={title}
              src={mediaItemUrl}
              width={100}
              height={100}
              layout="responsive"
              sizes="50vw"
              priority
            />
          );
        })}
      </div>
      <div className={Style.seeMoreLink}>
        <Link href="/quotes" passHref>
          <a>More Quotes...</a>
        </Link>
      </div>
    </article>
  );
};

export default RecentQuotes;
