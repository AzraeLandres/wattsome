import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { getConsommations } from "@/services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface Consommation {
  valeur: number;
  dateMesure: string;
}

const Dashboard = () => {
  useAuth();
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [modePersonnalise, setModePersonnalise] = useState(false);
  const [consommations, setConsommations] = useState<Consommation[]>([]);
  const [periode, setPeriode] = useState("mois");

  const getDateRange = () => {
    if (modePersonnalise && dateDebut && dateFin) {
      return { start: dateDebut, end: dateFin };
    }
    const end = new Date().toISOString().split("T")[0];
    const start = new Date();
    if (periode === "jour") start.setDate(start.getDate() - 7);
    if (periode === "mois") start.setMonth(start.getMonth() - 1);
    if (periode === "annee") start.setFullYear(start.getFullYear() - 1);
    return { start: start.toISOString().split("T")[0], end };
  };
  useEffect(() => {
    const { start, end } = getDateRange();
    getConsommations(start, end).then(setConsommations);
  }, [periode, dateDebut, dateFin, modePersonnalise]);

  const totalKwh = consommations.reduce((acc, c) => acc + Number(c.valeur), 0);
  const totalEuros = (totalKwh * 0.2516).toFixed(2);
  const totalCo2 = (totalKwh * 0.052).toFixed(2);

  const grouperDonnees = (data: Consommation[], echelle: string) => {
    const grouped: { [key: string]: number } = {};

    data.forEach((c) => {
      const date = new Date(c.dateMesure);
      let key = "";

      if (echelle === "jour" || modePersonnalise) {
        key = date.toLocaleDateString("fr-FR");
      } else if (echelle === "mois") {
        key = date.toLocaleDateString("fr-FR", {
          month: "short",
          year: "numeric",
        });
      } else {
        key = date.getFullYear().toString();
      }

      grouped[key] = (grouped[key] || 0) + Number(c.valeur);
    });

    return {
      labels: Object.keys(grouped),
      values: Object.values(grouped).map((v) => parseFloat(v.toFixed(2))),
    };
  };

  const { labels, values } = grouperDonnees(consommations, periode);

  const chartData = {
    labels,
    datasets: [
      {
        label: "kWh",
        data: values,
        backgroundColor: "#530FAD",
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">
        Suivre sa consommation
      </h2>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white rounded-lg p-3 text-center">
          <p className="text-2xl font-bold">{totalKwh.toFixed(1)}</p>
          <p className="text-xs text-gray-500">kWh</p>
        </div>
        <div className="bg-white rounded-lg p-3 text-center">
          <p className="text-2xl font-bold">{totalCo2}</p>
          <p className="text-xs text-gray-500">CO₂</p>
        </div>
        <div className="bg-white rounded-lg p-3 text-center">
          <p className="text-2xl font-bold">{totalEuros}</p>
          <p className="text-xs text-gray-500">€</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["jour", "mois", "annee"].map((p) => (
          <button
            key={p}
            onClick={() => {
              setPeriode(p);
              setModePersonnalise(false);
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              periode === p
                ? "bg-amber-400 text-purple-900"
                : "bg-white text-gray-600"
            }`}
          >
            {p === "jour" ? "Jour" : p === "mois" ? "Mois" : "Année"}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mb-4 items-center">
        <input
          type="date"
          value={dateDebut}
          onChange={(e) => {
            setDateDebut(e.target.value);
            setModePersonnalise(true);
          }}
          className="flex-1 bg-white rounded-lg p-2 text-sm border border-gray-200"
        />
        <span className="text-gray-500">→</span>
        <input
          type="date"
          value={dateFin}
          onChange={(e) => {
            setDateFin(e.target.value);
            setModePersonnalise(true);
          }}
          className="flex-1 bg-white rounded-lg p-2 text-sm border border-gray-200"
        />
      </div>

      <div className="bg-white rounded-lg p-4 mb-4">
        {consommations.length > 0 ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        ) : (
          <p className="text-center text-gray-500 py-8">
            Aucune donnée disponible
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
