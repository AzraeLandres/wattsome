import { createBrowserRouter } from "react-router-dom";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Dashboard from "./pages/Dashboard";
import Profil from "./pages/Profil";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
  {
    path: "/connexion",
    element: <Connexion />,
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
