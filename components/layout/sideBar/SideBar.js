import { useState } from "react";
import Link from "next/link";
import { Button } from "../../elements/Button";
import { LinksData } from "../NavItem";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import Style from "../../../styles/Sidebar.module.css";

const Navbar = ({ showSidebar }) => {
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
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
