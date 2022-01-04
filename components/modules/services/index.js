import React from "react";
import SocialMediaLinks from "../SocialMediaLinks";
import Styles from "../../../styles/Services.module.css";

const Index = () => {
  return (
    <div className={Styles.wrapper}>
      <h1>How can we help you?</h1>
      <p>
        If you want to promote your music, or your events or you want to make
        custom advertisements, please reach out to us on any of social media
        handles.
      </p>
      <h2>We run the following type of adverts</h2>
      <ul>
        <li>Sponsored posts</li>
        <li>Banner Ads</li>
        <li>Text Link Ads</li>
      </ul>
      <p>Our rates are very affordable! Contact us NOW!</p>
      <SocialMediaLinks />
    </div>
  );
};

export default Index;
