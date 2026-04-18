import { Zap, Home } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className=" w-full max-w-md bg-amber-50 rounded-3xl shadow-lg overflow-hidden  h-[85vh]">
        <header className="flex justify-between items-center pt-10 p-8 w-full">
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
        <main className="px-8 h-[calc(85vh-64px)] flex flex-col justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
