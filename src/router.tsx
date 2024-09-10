import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { Home } from "../src/routes/Home";
import LandingPage from "./components/landing-page";
import { Dashboard } from "./features/dashboard";
import { MainLayout } from "./components/layout/main-layout";
import { ConsultantList } from "./features/consultant/routes/consultant-list";
import { DiagnosesList } from "./features/diagnoses/routes/diagnoses-list";
import { UserList } from "./features/user/routes/user-list";
import { ChildPatientList } from "./features/patients/child/routes/child-patient-list";
import { ParentPatientList } from "./features/patients/parent/routes/parent-patient-list";

import { ChildCalllogs } from "./features/calllogs/child/routes/child-calllogs";
import { ParentCalllogs } from "./features/calllogs/parent/routes/parent-calllogs";
import { ChildSaleList } from "./features/sales/child/routes/child-sale-list";
import { ParentSaleList } from "./features/sales/parent/routes/parent-sale-list";
import { FollowupList } from "./features/followups/child/routes";

import { ParentFollowupList } from "./features/followups/parent/routes/parent-followup-list";
import { AuthLayout } from './components/layout/auth-layout';
import { Login } from './features/auth/routes/login';
import { ForgotPassword } from './features/auth/routes/forgot-password';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "consultants", element: <ConsultantList /> },
      { path: "diagnoses", element: <DiagnosesList /> },
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
  return (

  <RouterProvider router={router} />
  
);
}
