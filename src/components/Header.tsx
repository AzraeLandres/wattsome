import { Home, Zap } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-8 w-full">
      <Home className="text-purple-800" size={28} />
      <div className="flex items-center gap-2">
        <Zap className="text-amber-400" size={24} />
        <span className="text-xl font-bold text-purple-800">Wattsome</span>
      </div>
    </div>
  );
};

export default Header;
