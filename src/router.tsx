import { createBrowserRouter } from "react-router-dom";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Profil from "./pages/Profil";
import Accueil from "./pages/Accueil";

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
    path: "/",
    element: <Accueil />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profil",
    element: <Profil />,
  },
]);

export default router;
