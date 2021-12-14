import React from "react";
import Link from "next/link";
import Image from "next/image";
import Style from "../../../styles/Card.module.css";

const Card = ({
  excerpt,
  title,
  featuredImage,
  slug,
  page,
  buttonText,
  altText,
}) => {
  return (
    <Link href={`/${page}/${slug}`} passHref>
      <article className={Style.Card}>
        <div className={Style.cardImageContainer}>
          <Image
            src={featuredImage}
            width={100}
            height={70}
            layout="responsive"
            sizes="50vw"
            priority
            alt={altText}
          />
        </div>

        <div className={Style.CardContent}>
          <h2 className={Style.cardTitle}>{title}</h2>
          {excerpt && (
            <div
              className={Style.cardText}
              dangerouslySetInnerHTML={{ __html: excerpt }}
            ></div>
          )}
        </div>
        <a href={`/${page}/${slug}`} className={Style.cardBtn}>
          {buttonText}
        </a>
      </article>
    </Link>
  );
};

export default Card;
