import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Accueil = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="flex justify-center items-center flex-col w-full max-w-md bg-amber-50 rounded-3xl shadow-lg overflow-hidden px-10 h-[85vh]">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="text-amber-400" size={40} />
          <h1 className="text-4xl font-bold text-purple-800">Wattsome</h1>
        </div>
        <p className="text-gray-600 text-center mb-12 text-lg">
          Suivez et maîtrisez votre consommation électrique
        </p>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button
            onClick={() => navigate("/connexion")}
            className="bg-purple-700 hover:bg-purple-800 w-full"
          >
            Se connecter
          </Button>
          <Button
            onClick={() => navigate("/inscription")}
            variant="outline"
            className="border-purple-700 text-purple-700 w-full"
          >
            Créer un compte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
