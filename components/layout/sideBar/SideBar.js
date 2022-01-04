import { useState } from "react";
import Link from "next/link";
import { Button } from "../../elements/Button";
import { LinksData } from "../NavItem";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import buttonStyle from "../../../styles/Button.module.css";
import Style from "../../../styles/Sidebar.module.css";
import { DropDown, DropDownIcon } from "../DropDown";

const Navbar = ({ showSidebar, handleClick, genres }) => {
  const [dropDown, setDropDown] = useState(false);

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <AnimatePresence>
      {showSidebar && (
        <motion.nav
          key="sidebar"
          initial={{ x: 500 }}
          animate={{ x: 10 }}
          exit={{ x: 500 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={Style.nav}
        >
          <div className={Style.nav_links_container}>
            <ul>
              {LinksData.map((link) => {
                const { id, url, text, subMenu } = link;
                return (
                  <>
                    <li key={id}>
                      <div>
                        <Link href={url}>
                          <a onClick={handleClick}>{text}</a>
                        </Link>
                        {subMenu && (
                          <DropDownIcon
                            toggleDropDown={toggleDropDown}
                            dropDown={dropDown}
                            key={id}
                            color="white"
                          />
                        )}
                      </div>
                      {subMenu && (
                        <DropDown
                          handleClick={handleClick}
                          genres={genres}
                          dropDown={dropDown}
                        />
                      )}
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
