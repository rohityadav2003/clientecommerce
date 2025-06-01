import React from "react";
import Home from "../pages/Home";
import Main from "../pages/Main";
import Footer from "../pages/Footer";
import { useLocation } from "react-router-dom";

export default function Headmain() {
  return (
    <div>
      <Home></Home>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}
