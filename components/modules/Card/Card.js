import React from "react";
import Link from "next/link";
import Image from "next/image";
import Style from "../../../styles/Card.module.css";
import { shortenSentence } from "../../../utils/shortenSentence";
import { purifyHTML } from "../../../utils/purifyHtml";
import parse, { domToReact } from "html-react-parser";

const Card = ({
  excerpt,
  title,
  featuredImage,
  slug,
  page,
  buttonText,
  altText,
  postType,
}) => {
  const options = {
    replace: (domNode) => {
      if (domNode.name == "p") {
        const p = domNode.children[0].data;
        return (
          <p>
            {shortenSentence(p, 100)}
            {"..."}
          </p>
        );
      }
    },
  };

  return (
    <Link href={`/${page}/${slug}`} passHref>
      <article className={Style.Card}>
        <div className={Style.cardImageContainer}>
          {featuredImage && (
            <Image
              src={featuredImage}
              width={100}
              height={70}
              layout="responsive"
              sizes="50vw"
              priority
              alt={altText}
            />
          )}
        </div>

        {postType && <p className={Style.musicType}>{postType}</p>}

        <div className={Style.CardContent}>
          <h2 className={Style.cardTitle}>{title}</h2>
          {excerpt && (
            <div className={Style.cardText}>
              {parse(purifyHTML(excerpt), options)}
            </div>
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
