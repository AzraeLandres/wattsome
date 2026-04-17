import { Outlet, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    getAlertes().then((data: Alerte[]) => {
      if (Array.isArray(data)) {
        setNbAlertes(data.filter((a) => !a.lu).length);
      }
    });
  }, []);

  return (
    <div className="pb-16 min-h-screen bg-amber-50">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
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
      <main className="p-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AuthLayout;
