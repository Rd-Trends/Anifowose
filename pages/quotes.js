import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getQuotes } from "../utils/paginatedQuotesQuery";
import Layout from "../components/layout/index";
import { Button } from "../components/elements/Button/index";
import Seo from "../components/layout/Seo";
import Style from "../styles/CardSections.module.css";
import buttonStyle from "../styles/Button.module.css";

const Quotes = ({ data }) => {
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState(""); //used for pagination, reference to the last value
  const [quotes, setQuotes] = useState([]);

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    setHasNextPage(data.pageInfo.hasNextPage);
    setEndCursor(data.pageInfo.endCursor);
    setQuotes(data.edges);
  }, [data.edges, data.pageInfo.hasNextPage, data.pageInfo.endCursor]);

  const updateQuotes = async () => {
    const updatedQuotesData = await getQuotes(8, endCursor);
    const updatedQuote = updatedQuotesData.edges;
    setQuotes((prevPageQuotes) => [...prevPageQuotes, ...updatedQuote]);
    setHasNextPage(updatedQuotesData.pageInfo.hasNextPage);
    setEndCursor(updatedQuotesData.pageInfo.endCursor);
  };

  return (
    <Layout>
      <Seo url={url} />
      <article className={Style.container}>
        <h1 className={Style.heading}>Be Motivated!</h1>
        <div className={Style.cardWrapper}>
          {quotes.map((post) => {
            const { node } = post;
            let { title, mediaItemUrl } = node.image.quoteImage;
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
        <div style={{ paddingTop: "2rem" }}>
          {hasNextPage ? (
            <Button
              className={buttonStyle.btn_primary}
              handleClick={updateQuotes}
              style={{ paddingTop: "5rem" }}
            >
              Load More...
            </Button>
          ) : (
            <p>No more quotes to load...</p>
          )}
        </div>
      </article>
    </Layout>
  );
};

export default Quotes;

export async function getStaticProps({ params }) {
  const data = await getQuotes(8, null);

  return {
    props: {
      data,
    },
    revalidate: 10, //keep updating every ten seconds
  };
}
