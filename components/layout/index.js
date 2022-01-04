import React from "react";
import { Navbar } from "./navbar/index";
import { Footer } from "./Footer/index";
import Meta from "./Meta";
import Styles from "../../styles/Layout.module.css";

const Index = ({ children }) => {
  return (
    <div className={Styles.wrapper}>
      <Meta />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Index;
