import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(props) {
  const { pathname } = useLocation();
  return (
    <div>
      {pathname !== "/signup" && pathname !== "/login" ? <Header /> : null}
      <Outlet />
      {pathname !== "/signup" && pathname !== "/login" ? <Footer /> : null}
    </div>
  );
}
