import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout/index";
import { Comment } from "../../components/modules/comment/index";
import { getPost } from "../../queries/wordpress";
import { getSlugs } from "../../queries/slugs";
import { Form } from "../../components/modules/commentForm/index";
import SharePost from "../../components/modules/SharePost/index";
import Seo from "../../components/layout/Seo";
import Style from "../../styles/Article.module.css";
import buttonStyle from "../../styles/Button.module.css";
import { object } from "sharp/lib/is";

const PostPage = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [url, setUrl] = useState("");

  const downloadRef = useRef(null);

  useEffect(() => {
    setUrl(window.location.href);
    setComments(post?.comments?.nodes);
  }, [post.comments.nodes]);

  // useEffect(async () => {
  //   const data = {
  //     mediaUrl: post?.mediaurl?.musicFile?.mediaItemUrl,
  //   };
  //   const response = await fetch(post?.mediaurl?.musicFile?.mediaItemUrl);
  //   const blob = await response.blob();
  //   console.log(blob);
  //   const url = await URL.createObjectURL(blob);
  //   console.log(url);
  //   downloadRef.current.href = url;
  //   downloadRef.current.download = `${post?.mediaurl?.musicFile?.title}.mp3`;
  // }, []);
  // const downloadMusicFile = async () => {

  // };

  return (
    <>
      {post && (
        <article className={Style.wrapper}>
          <Seo seo={post?.seo} url={url} />
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

          {/* <a ref={downloadRef} download className={buttonStyle.btn_primary}>
            download
          </a> */}

          <div className={Style.sharePostSection}>
            <h3>Share this post</h3>
            <SharePost title={post?.title} url={url} />
          </div>

          <div className={Style.commentSection}>
            <h1>
              Comments
              {post?.commentCount ? `{ ${post.commentCount} }` : "{ 0 }"}
            </h1>

            <Form
              postId={post?.musicId}
              setComments={setComments}
              type="music"
            />

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
  const postSlugs = await getSlugs("music");

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
  const post = await getPost("music", params.slug);

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}
