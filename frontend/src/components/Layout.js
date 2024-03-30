import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="content-container">
          <Outlet />
        </div>
        <RightSidebar />
      </div>
      
    </div>
  );
};

export default Layout;
