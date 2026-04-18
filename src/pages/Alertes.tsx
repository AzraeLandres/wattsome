import { useState, useEffect } from "react";
import { getAlertes, marquerAlerteLue } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, BellOff } from "lucide-react";

interface Alerte {
  idAlerte: string;
  message: string;
  dateAlerte: string;
  lu: boolean;
}

const Alertes = () => {
  const [alertes, setAlertes] = useState<Alerte[]>([]);

  useEffect(() => {
    getAlertes().then(setAlertes);
  }, []);

  const handleMarquerLu = async (id: string) => {
    await marquerAlerteLue(id);
    setAlertes(
      alertes.map((a) => (a.idAlerte === id ? { ...a, lu: true } : a)),
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-purple-800">Alertes</h2>
      {alertes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <BellOff size={48} className="mb-4" />
          <p>Aucune alerte pour le moment</p>
        </div>
      ) : (
        alertes.map((alerte) => (
          <Card
            key={alerte.idAlerte}
            className={`cursor-pointer ${alerte.lu ? "opacity-60" : "border-amber-400"}`}
            onClick={() => !alerte.lu && handleMarquerLu(alerte.idAlerte)}
          >
            <CardContent className="pt-4 flex items-start gap-3">
              <Bell
                size={20}
                className={alerte.lu ? "text-gray-400" : "text-amber-400"}
              />
              <div className="flex-1">
                <p
                  className={`text-sm ${alerte.lu ? "text-gray-400" : "text-purple-800 font-medium"}`}
                >
                  {alerte.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(alerte.dateAlerte).toLocaleDateString("fr-FR")}
                </p>
              </div>
              {!alerte.lu && (
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Alertes;
