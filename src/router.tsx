import { createBrowserRouter } from "react-router-dom";
import Inscription from "./pages/Inscription.tsx";
import Connexion from "./pages/Connexion.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Profil from "./pages/Profil.tsx";
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
