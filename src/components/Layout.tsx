import { Zap, Home } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="flex justify-between items-center p-4 w-full">
        <Home
          className="text-purple-800 cursor-pointer"
          size={28}
          onClick={() => navigate("/")}
        />
        <div className="flex items-center gap-2">
          <Zap className="text-amber-400" size={24} />
          <span className="text-xl font-bold text-purple-800">Wattsome</span>
        </div>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
