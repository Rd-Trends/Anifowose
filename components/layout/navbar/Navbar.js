import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Logo } from "../../elements/Logo";
import { Button } from "../../elements/Button";
import { Sidebar } from "../sideBar";
import { LinksData } from "../NavItem";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { GoThreeBars } from "react-icons/go";
import Style from "../../../styles/Navbar.module.css";
import buttonStyle from "../../../styles/Button.module.css";
import { filterCategories } from "../../../utils/filterCategories";
import { getMusicGenres } from "../../../queries/music";
import { DropDownIcon } from "../DropDown";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [genres, setGenres] = useState([]);
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    const categories = await getMusicGenres();
    setGenres(() => filterCategories(categories));
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const showDropDown = () => {
    setDropDown(true);
  };
  const hideDropDown = () => {
    setDropDown(false);
  };

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const DropDown = () => {
    return (
      <>
        {dropDown && (
          <ul className={Style.dropDown}>
            {genres.map((genre) => {
              const { name, slug } = genre;
              return (
                <>
                  <li key={name}>
                    <Link href={`/posts/category/${slug}`}>
                      <a>{name}</a>
                    </Link>
                  </li>
                </>
              );
            })}
          </ul>
        )}
      </>
    );
  };

  return (
    <nav className={Style.nav}>
      <Logo imgSrc="/omo colour.png" />
      <Button
        className={buttonStyle.btn_navBtn}
        handleClick={toggleSidebar}
        label="Navigation Toggler"
      >
        {!showSidebar ? (
          <GoThreeBars color="var(--primary)" />
        ) : (
          <AiOutlineClose color="white" />
        )}
      </Button>
      <div className={Style.nav_links_container}>
        <ul>
          {LinksData.map((link) => {
            const { id, url, text, subMenu } = link;
            return (
              <li
                key={id}
                onMouseEnter={subMenu ? showDropDown : null}
                onMouseLeave={subMenu ? hideDropDown : null}
              >
                <div>
                  <Link href={url}>
                    <a>{text}</a>
                  </Link>
                  {subMenu && (
                    <DropDownIcon
                      color="var(--primary)"
                      dropDown={dropDown}
                      toggleDropDown={toggleDropDown}
                      key={id}
                    />
                  )}
                </div>

                {subMenu && <DropDown />}
              </li>
            );
          })}
        </ul>
      </div>
      <Sidebar
        showSidebar={showSidebar}
        handleClick={toggleSidebar}
        genres={genres}
      />
    </nav>
  );
};

export default Navbar;
