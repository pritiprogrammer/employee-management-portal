import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ErrorBoundary from "./pages/Error/ErrorBoundary";
import EmployeeDetails from "./features/employees/components/EmployeeDetails/EmployeeDetails";
import EmployeeEdit from "./pages/Employees/EmployeeEdit/EmployeeEdit";
import EmployeeCreate from "./pages/Employees/EmployeeCreate/EmployeeCreate";
import Employees from "./pages/Employees/Employees";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
    errorElement: <ErrorBoundary />,
  },
  {
    element: <PublicRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
 {
  element: <ProtectedRoute />,
  errorElement: <ErrorBoundary />,
  children: [
    {
      path: "/dashboard",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      ],
    },

    {
      path: "/employees",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Employees />,
        },
      ],
    },

    {
      path: "/employees/:employeeId",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <EmployeeDetails />,
        },
      ],
    },
     {
      path: "/employees/:employeeId/edit",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <EmployeeEdit />,
        },
      ],
    },
    {
  path: "/employees/new",
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <EmployeeCreate />,
    },
  ],
},

  ],
},
]);