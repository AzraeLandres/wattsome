import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, LogOut, User } from "lucide-react";

const Profil = () => {
  const navigate = useNavigate();

  const handleDeconnexion = () => {
    localStorage.removeItem("token");
    navigate("/connexion");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-purple-800">Mon profil</h2>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 rounded-full p-3">
              <User className="text-purple-700" size={24} />
            </div>
            <div>
              <p className="font-medium text-purple-800">Mon compte</p>
              <p className="text-sm text-gray-500">
                {localStorage.getItem("nom")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 rounded-full p-3">
              <Zap className="text-amber-500" size={24} />
            </div>
            <div>
              <p className="font-medium text-purple-800">Compteur Linky</p>
              <p className="text-sm text-gray-500">Connecter ou reconnecter</p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/linky")}
            className="w-full bg-amber-400 hover:bg-amber-500 text-purple-900"
          >
            Gérer ma connexion Linky
          </Button>
        </CardContent>
      </Card>

      <Button
        onClick={handleDeconnexion}
        variant="outline"
        className="w-full border-red-300 text-red-500 hover:bg-red-50"
      >
        <LogOut size={16} className="mr-2" />
        Se déconnecter
      </Button>
    </div>
  );
};

export default Profil;
