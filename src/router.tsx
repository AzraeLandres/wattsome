import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Profil from "./pages/Profil";
import Accueil from "./pages/Accueil";
import ConnexionLinky from "./pages/ConnexionLinky";
import AuthLayout from "./components/AuthLayout";
import Alertes from "./pages/Alertes";
import { useEffect, useState } from "react";
import { getProfil } from "./services/api";

const RequireAuth = () => {
  const [auth, setAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfil()
      .then(() => setAuth(true))
      .catch(() => {
        setAuth(false);
        navigate("/connexion");
      });
  }, [navigate]);

  if (auth === null) return null;
  return <Outlet />;
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
          {
            path: "/alertes",
            element: <Alertes />,
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
