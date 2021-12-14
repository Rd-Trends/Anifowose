import { Logo } from "../../elements/Logo";
import Link from "next/link";
import { LinksData } from "../NavItem";
import SocialMediaLinks from "../../modules/SocialMediaLinks/index";
import Style from "../../../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={Style.footer}>
      <div className={Style.logoSection}>
        <Logo imgSrc="/anifowoshewhitelogo.svg" />
        <SocialMediaLinks />
      </div>
      <div className={Style.navSection}>
        {LinksData.map((link) => {
          const { id, url, text } = link;
          return (
            <Link key={id} href={url}>
              <a>{text}</a>
            </Link>
          );
        })}
      </div>
      <div className={Style.servicesSection}>
        <h1>Services</h1>
        <p>Music promotion</p>
        <p>Events promotion</p>
        <p>Artist Hyping</p>
        <p>Advertisements</p>
      </div>
    </footer>
  );
};

export default Footer;
