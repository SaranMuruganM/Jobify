import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";

const BigSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <main
        className={
          showSidebar ? "sidebar-container" : "sidebar-container  show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            <NavLinks isBigsidebar />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default BigSidebar;
