import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import { Zap, Bell } from "lucide-react";

const AuthLayout = () => (
  <div className="pb-16 min-h-screen bg-amber-50">
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <Zap className="text-amber-400" size={24} />
        <span className="text-xl font-bold text-purple-800">Wattsome</span>
      </div>
      <Bell className="text-amber-400" size={24} />
    </header>
    <main className="p-4">
      <Outlet />
    </main>
    <BottomNav />
  </div>
);

export default AuthLayout;
