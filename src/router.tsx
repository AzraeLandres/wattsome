import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Profil from "./pages/Profil";
import Accueil from "./pages/Accueil";
import ConnexionLinky from "./pages/ConnexionLinky";
import AuthLayout from "./components/AuthLayout";

const RequireAuth = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/connexion" />;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/inscription",
        element: <Inscription />,
      },
      {
        path: "/connexion",
        element: <Connexion />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/linky",
            element: <ConnexionLinky />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/profil",
            element: <Profil />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Accueil />,
  },
]);

export default router;
