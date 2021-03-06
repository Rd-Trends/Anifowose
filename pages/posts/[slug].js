import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout/index";
import { Comment } from "../../components/modules/comment/index";
import { Form } from "../../components/modules/commentForm/index";
import { getPost } from "../../queries/wordpress";
import { getSlugs } from "../../queries/slugs";
import SharePost from "../../components/modules/SharePost/index";
import Services from "../../components/modules/services";
import Seo from "../../components/layout/Seo";
import { purifyHTML } from "../../utils/purifyHtml";
import PostMeta from "../../components/modules/PostMeta/index";
import parse from "html-react-parser";
import Style from "../../styles/Article.module.css";
import { getDate } from "../../utils/utils";

const PostPage = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
    setComments(post?.comments?.nodes);
  }, [post.comments.nodes]);

  const options = {
    replace: (domNode) => {
      if (domNode.name != "img") {
        return;
      }

      if (domNode.name == "img") {
        const src = domNode.attribs.src;

        return (
          <Image
            src={src}
            width={100}
            height={100}
            layout="responsive"
            sizes="50vw"
            priority
            alt="image for posts"
          />
        );
      }
    },
  };

  return (
    <>
      <Seo seo={post?.seo} url={url} />
      {post && (
        <article className={Style.wrapper}>
          <h1 className={Style.title}>{post?.title}</h1>
          <div className={Style.imageContainer}>
            <Image
              src={post?.featuredImage?.node?.mediaItemUrl}
              width={100}
              height={70}
              layout="responsive"
              sizes="50vw"
              priority
              alt={post?.featuredImage?.node?.title}
            />
          </div>

          <PostMeta
            artist={post?.author?.node?.username}
            readTime={post?.seo?.readingTime}
            datePublished={getDate(post?.date)}
            categories={post?.categories?.nodes}
            tags={post?.tags?.nodes}
          />

          <div className={Style.contentWrapper}>
            {parse(purifyHTML(post?.content), options)}
          </div>

          <div className={Style.sharePostSection}>
            <h3>Share this post</h3>
            <SharePost title={post?.title} url={url} />
          </div>

          <div className={Style.serviceSection}>
            <Services />
          </div>

          <div className={Style.commentSection}>
            <h1>
              Comments
              {post?.commentCount ? `{ ${post.commentCount} }` : "{ 0 }"}
            </h1>
            <Form postId={post?.postId} type="post" setComments={setComments} />

            <Comment comments={comments} />
          </div>
        </article>
      )}

      {!post && <p>Sorry, an error occured</p>}
    </>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const postSlugs = await getSlugs("posts");
  const paths = postSlugs.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const post = await getPost("post", params.slug);

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}
