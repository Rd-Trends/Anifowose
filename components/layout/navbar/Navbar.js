import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Logo } from "../../elements/Logo";
import { Button } from "../../elements/Button";
import { Input } from "../../elements/FormElements";
import { Sidebar } from "../sideBar";
import { LinksData } from "../NavItem";
import { AiOutlineBars, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import Style from "../../../styles/Navbar.module.css";
import buttonStyle from "../../../styles/Button.module.css";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleLinks = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <nav className={Style.nav}>
      <div className={Style.logoAndSearchWrapper}>
        <Logo imgSrc="/anifowoshe logo.svg" />
        {/* <form>
          <Input type="search" name="Search Posts" placeholder="Search...." />
          <Button className={buttonStyle.btn_iconBtn}>
            {<AiOutlineSearch />}
          </Button>
        </form> */}
      </div>
      <Button
        className={buttonStyle.btn_navBtn}
        handleClick={toggleLinks}
        label="Navigation Toggler"
      >
        {!showSidebar ? <AiOutlineBars /> : <AiOutlineClose />}
      </Button>
      <div className={Style.nav_links_container}>
        <ul>
          {LinksData.map((link) => {
            const { id, url, text } = link;
            return (
              <li key={id}>
                <Link href={url}>
                  <a>{text}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Sidebar showSidebar={showSidebar} />
    </nav>
  );
};

export default Navbar;
