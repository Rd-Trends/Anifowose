import React from "react";
import Image from "next/image";
import { WhatsappIcon, FacebookIcon, TwitterIcon } from "next-share";

const SocialMediaLinks = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <a
        style={{ margin: "0.5rem" }}
        href="https://www.facebook.com/bigtymakele"
        aria-label="link to Anifowose facebook page"
        target="_blank"
        rel="noreferrer"
      >
        {<FacebookIcon round size={50} />}
      </a>
      <a
        style={{ margin: "0.5rem" }}
        href="https://www.instagram.com/omo__anifowose?r=nametag"
        aria-label="link to Anifowose instagram profile"
        target="_blank"
        rel="noreferrer"
      >
        {
          <Image
            alt="instagram icon"
            width={50}
            height={50}
            src="/instagram.svg"
            rel="noreferrer"
          />
        }
      </a>
      <a
        style={{ margin: "0.5rem" }}
        href="https://twitter.com/omo__anifowose?s=09"
        aria-label="link to twitter handle"
        target="_blank"
        rel="noreferrer"
      >
        {<TwitterIcon round size={50} />}
      </a>
      <a
        style={{ margin: "0.5rem" }}
        href="https://wa.me/+2348060268576"
        aria-label="link to chat Anifowose on whatsapp"
        target="_blank"
        rel="noreferrer"
      >
        {<WhatsappIcon size={50} round />}
      </a>
    </div>
  );
};

export default SocialMediaLinks;
