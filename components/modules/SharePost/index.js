import React from "react";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
} from "next-share";

const SharePost = ({ url, title }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FacebookShareButton url={url} title={title} style={{ margin: "0.5rem" }}>
        <FacebookIcon round size={48} />
      </FacebookShareButton>
      <FacebookMessengerShareButton
        url={url}
        title={title}
        style={{ margin: "0.5rem" }}
      >
        <FacebookMessengerIcon round size={48} />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={url} title={title} style={{ margin: "0.5rem" }}>
        <TwitterIcon round size={48} />
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title} style={{ margin: "0.5rem" }}>
        <WhatsappIcon round size={48} />
      </WhatsappShareButton>
    </div>
  );
};

export default SharePost;
