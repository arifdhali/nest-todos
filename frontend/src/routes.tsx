import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "./layout/AuthLayout";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: Home },
        ],
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            { index: true, element: <Navigate to="/auth/login" replace /> },
            { path: "login", Component: Login },
            { path: "register", Component: Register },
        ],
    },
    {
        path: "dashboard",
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: Dashboard
            }
        ]
    }
]);


