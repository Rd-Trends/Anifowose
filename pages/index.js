import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import { Header } from "../components/modules/header";
import { RecentMusic } from "../components/modules/RecentMusic/index";
import { RecentNews } from "../components/modules/RecentNews/index";
import { RecentQuotes } from "../components/modules/RecentQuotes.js/index";
import { getPosts } from "../utils/wordpress";
import { getQuotes } from "../utils/paginatedQuotesQuery";
import About from "../components/modules/About/index";
import Seo from "../components/layout/Seo";
import { useEffect, useState } from "react";

// import axios from "axios";
// import fileDownload from "js-file-download";
// import jsFileDownloader from "js-file-downloader";

export default function Home({ posts, quotes }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <Layout>
      <Seo url={url} />
      <Header />
      <RecentMusic posts={posts?.recentMusic} />
      <RecentNews posts={posts?.recentNews} />
      <RecentQuotes quotes={quotes?.edges} />
      <About />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const quotes = await getQuotes(4, null);
  const posts = await getPosts();

  return {
    props: {
      posts,
      quotes,
    },
    revalidate: 10, //keep updating every ten seconds
  };
}
