import { Outlet, useNavigate, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import { Zap, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { getAlertes } from "@/services/api";

interface Alerte {
  idAlerte: string;
  lu: boolean;
}
const AuthLayout = () => {
  const navigate = useNavigate();
  const [nbAlertes, setNbAlertes] = useState(0);
  const location = useLocation();
  useEffect(() => {
    getAlertes().then((data: Alerte[]) => {
      if (Array.isArray(data)) {
        setNbAlertes(data.filter((a) => !a.lu).length);
      }
    });
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center gap-0">
      <div className="w-full max-w-md bg-amber-50 rounded-3xl shadow-lg overflow-hidden  h-[85vh]">
        <header className="flex justify-between items-center pt-10 px-8 w-full">
          <div
            className="flex items-center gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <Zap className="text-amber-400" size={24} />
            <span className="text-xl font-bold text-purple-800">Wattsome</span>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/alertes")}
          >
            <Bell className="text-amber-400" size={24} />
            {nbAlertes > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {nbAlertes}
              </span>
            )}
          </div>
        </header>
        <main className="p-4 h-[calc(85vh-72px-72px)] ">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default AuthLayout;
