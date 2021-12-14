import Image from "next/image";
import Link from "next/link";
import Style from "../../../styles/Header.module.css";
import buttonStyle from "../../../styles/Button.module.css";
import SocialMediaLinks from "../SocialMediaLinks/index";

const Header = () => {
  return (
    <header className={Style.header}>
      <div className={Style.overlay}></div>
      <Image
        src="/abg2.webp"
        layout="fill"
        priority
        alt="hero section cover image"
        sizes="100vw"
        objectFit="cover"
        objectPosition="center"
      />
      <div className={Style.header_content}>
        <h1>Your number one site to download music and motivational quotes</h1>
        <p>
          Get all entertainment news, trending celebrities update - local and
          international
        </p>
        <SocialMediaLinks />
      </div>
    </header>
  );
};

export default Header;
