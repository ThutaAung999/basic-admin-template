import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./components/landing-page";
import { Dashboard } from "./features/dashboard";

import { AuthLayout } from "./components/layout/auth-layout";
import { Login } from "./features/auth/routes/login";

import { ConsultantList, DiagnosisList, UserList } from "./features";
import { ForgotPassword } from "./features/auth";
import { ParentFollowupList } from "./features/followups";
import { ParentSaleList } from "./features/sales/parent";
import { MainLayout } from "./components";
import { ChildPatientList, ParentPatientList } from "./features/patients";
import { ChildCalllogs, ParentCalllogs } from "./features/calllogs";

import { ChildSaleList } from "./features/sales/child/routes/child-sale-list";
import { FollowupList } from "./features/followups/child/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "consultants", element: <ConsultantList /> },
      { path: "diagnoses/:tab?", element: <DiagnosisList /> },
      {
        path: "users",
        element: <UserList />,
      },
      { path: "patients", element: <ChildPatientList /> },
      { path: "mothers/patients", element: <ParentPatientList /> },
      { path: "call_logs", element: <ChildCalllogs /> },
      { path: "mother_call_logs", element: <ParentCalllogs /> },
      { path: "child_sales", element: <ChildSaleList /> },
      { path: "mother_sales", element: <ParentSaleList /> },
      { path: "follow-ups", element: <FollowupList /> },
      { path: "/mother/follow-ups", element: <ParentFollowupList /> },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  { path: "/landing-page", element: <LandingPage /> },
  {
    path: "/contact",
    element: <h1>Contact</h1>,
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
