import React, { createContext, useContext, useState } from "react";
import Wrapper from "../assets/wrappers/Dashboard";
import { Outlet, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { SmallSidebar, BigSidebar, NavBar } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
const DashboardContext = createContext();
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  //temp
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarktheme, setisDarktheme] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDarktheme = () => {
    const newDarktheme = !isDarktheme;
    setisDarktheme(newDarktheme);
    document.body.classList.toggle("dark-theme", newDarktheme);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        toggleSidebar,
        toggleDarktheme,
        logoutUser,
        showSidebar,
        isDarktheme,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
