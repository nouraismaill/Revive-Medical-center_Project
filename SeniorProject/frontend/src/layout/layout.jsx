import React from "react";
import StickyNavbar from "../components/header";
import Footer from "../components/footer";
import Routers from "../routes/Routers";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  return (
    <>
      <StickyNavbar />
      <main>
        <ScrollToTop />
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
