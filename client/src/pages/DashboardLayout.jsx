import React, { createContext, useContext, useState } from "react";
import Wrapper from "../assets/wrappers/Dashboard";
import {
  Outlet,
  useLoaderData,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { SmallSidebar, BigSidebar, NavBar, Loader } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const DashboardContext = createContext();

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const response = await customFetch.get("/users/current-user");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = (queryClient) => {
  //temp
  const { user } = useQuery(userQuery)?.data;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

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
    queryClient.invalidateQueries(["user"]);
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
              {isPageLoading ? <Loader /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
