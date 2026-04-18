import { useNavigate, useLocation } from "react-router-dom";
import { TrendingUp, User, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { getProfil } from "@/services/api";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasLinky, setHasLinky] = useState<boolean | null>(null);

  useEffect(() => {
    getProfil().then((data) => {
      setHasLinky(!!data.prm);
    });
  }, []);

  const tabs = hasLinky
    ? [
        { path: "/dashboard", icon: TrendingUp, label: "Tableau de bord" },
        { path: "/profil", icon: User, label: "Profil" },
      ]
    : [
        { path: "/linky", icon: Zap, label: "Linky" },
        { path: "/profil", icon: User, label: "Profil" },
      ];

  if (hasLinky === null) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16">
      {tabs.map(({ path, icon: Icon, label }) => {
        const isActive = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-1 flex-1 py-2"
          >
            <Icon
              size={22}
              className={isActive ? "text-purple-700" : "text-gray-400"}
            />
            <span
              className={`text-xs ${isActive ? "text-purple-700 font-medium" : "text-gray-400"}`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
