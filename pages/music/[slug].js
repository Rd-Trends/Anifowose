import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Comment } from "../../components/modules/comment/index";
import { getPost } from "../../queries/wordpress";
import { getSlugs } from "../../queries/slugs";
import { Form } from "../../components/modules/commentForm/index";
import SharePost from "../../components/modules/SharePost/index";
import Seo from "../../components/layout/Seo";
import { RiDownloadLine } from "react-icons/ri";
import parse, { domToReact } from "html-react-parser";
import PostMeta from "../../components/modules/PostMeta";
import Services from "../../components/modules/services";
import Style from "../../styles/Article.module.css";
import { purifyHTML } from "../../utils/purifyHtml";
import { getMusicNameFromURL } from "../../utils/getMusicNameFromURL";

const PostPage = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [url, setUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
    setComments(post?.comments?.nodes);
  }, [post?.comments?.nodes]);

  // fetch blob and download the music
  useEffect(async () => {
    let url;
    if (downloadUrl) {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = getMusicNameFromURL(downloadUrl);
      a.click();
      a.remove();
      setDownloadUrl("");
    }

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [downloadUrl]);

  const getDowmLoadURL = (e) => {
    e.preventDefault();
    setDownloadUrl(e.target.href);
  };

  // use this options to replace wordpress audio and include
  // the download btn to download the music
  const options = {
    replace: (domNode) => {
      if (domNode.name != "audio") {
        return;
      }

      if (domNode.name == "audio") {
        const src = domNode.attribs.src;
        const downloadName = getMusicNameFromURL(src);

        return (
          <div className={Style.audioAndDownLoadBtnSection}>
            <audio src={src} controls></audio>
            <a
              href={src}
              onClick={getDowmLoadURL}
              className={Style.downloadBtn}
            >
              <span>
                <RiDownloadLine />
              </span>
              <p>download {downloadName}</p>
            </a>
          </div>
        );
      }
    },
  };

  return (
    <>
      {post && (
        <article className={Style.wrapper}>
          <Seo seo={post?.seo} url={url} />
          <h1 className={Style.title}>{post?.title}</h1>
          <div className={Style.imageContainer}>
            {post?.featuredImage?.node?.mediaItemUrl && (
              <Image
                src={post?.featuredImage?.node?.mediaItemUrl}
                width={100}
                height={80}
                layout="responsive"
                sizes="50vw"
                priority
                alt={post?.featuredImage?.node?.title}
              />
            )}
          </div>

          <PostMeta
            artist={post?.artistName?.artist}
            runtime={post?.runTime?.runtime}
            datePublished={post?.releaseDate?.releasedate}
            genres={post?.categories?.nodes}
            tags={post?.tags?.nodes}
          />

          {/* main article content */}
          <div className={Style.contentWrapper}>
            {parse(purifyHTML(post?.content), options)}
          </div>

          {/* share this post section */}
          <div className={Style.sharePostSection}>
            <h3>Share this post</h3>
            <SharePost title={post?.title} url={url} />
          </div>

          <div className={Style.serviceSection}>
            <Services />
          </div>

          {/* comments section */}
          <div className={Style.commentSection}>
            <h1>
              Comments
              {post?.commentCount ? `{ ${post.commentCount} }` : "{ 0 }"}
            </h1>

            {/* form to submit comment */}
            <Form
              postId={post?.musicId}
              setComments={setComments}
              type="music"
            />

            {/* comments */}
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
