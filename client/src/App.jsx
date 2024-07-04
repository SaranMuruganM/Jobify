import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardLayout,
  Login,
  Admin,
  Landing,
  Register,
  Error,
  Homelayout,
  AddJob,
  Profile,
  Stats,
  AllJobs,
  EditJob,
} from "./pages";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { action as registerAction } from "../src/pages/Register";
import { action as loginAction } from "../src/pages/Login";
import { loader as dashboardLoader } from "../src/pages/DashboardLayout";
import { action as addjobAction } from "../src/pages/AddJob";
import { loader as alljobsLoader } from "../src/pages/AllJobs";
import { action as editjobAction } from "../src/pages/EditJob";
import { loader as editjobsLoader } from "../src/pages/EditJob";
import { action as deletejobAction } from "../src/pages/DeleteJob";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "../src/pages/Profile";
import { loader as statsLoader } from "./pages/Stats";
import { ErrorElement } from "./components";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },

      {
        path: "/login",
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addjobAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: alljobsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },

          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "editjob/:id",
            element: <EditJob />,
            action: editjobAction(queryClient),
            loader: editjobsLoader,
          },
          {
            path: "deletejob/:id",
            action: deletejobAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
