import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout/index";
import { Comment } from "../../components/modules/comment/index";
import { Form } from "../../components/modules/commentForm/index";
import { getPost, getPostSlugs } from "../../utils/wordpress";
import SharePost from "../../components/modules/SharePost/index";
import Seo from "../../components/layout/Seo";
import Style from "../../styles/Article.module.css";

const PostPage = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
    setComments(post?.comments?.nodes);
  }, [post.comments.nodes]);
  return (
    <Layout>
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

          <div
            className={Style.contentWrapper}
            dangerouslySetInnerHTML={{ __html: post?.content }}
          ></div>

          <div className={Style.sharePostSection}>
            <h3>Share this post</h3>
            <SharePost title={post?.title} url={url} />
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
    </Layout>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const postSlugs = await getPostSlugs("posts");
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
