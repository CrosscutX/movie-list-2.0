import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout(props) {
  const { pathname } = useLocation();
  return (
    <div>
      {pathname !== "/signup" && pathname !== "/signin" ? <Header /> : null}
      <Outlet />
    </div>
  );
}
