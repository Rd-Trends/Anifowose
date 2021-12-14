import React from "react";
import { Navbar } from "./navbar/index";
import { Footer } from "./Footer/index";
import Meta from "./Meta";

const index = ({ children }) => {
  return (
    <>
      <Meta />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default index;
