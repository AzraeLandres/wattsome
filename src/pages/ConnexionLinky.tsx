import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { connectLinky } from "@/services/api";

const ConnexionLinky = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await connectLinky(token);

      if (data.message === "Compteur Linky connecté avec succès") {
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Erreur serveur, réessayez plus tard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-purple-800">
            Connecter mon Linky
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            Obtenez votre token en accédant à votre espace client Enedis
          </p>
          <a
            href="https://conso.boris.sh"
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <Button className="w-full bg-amber-400 hover:bg-amber-500 text-purple-900">
              Accéder à mon espace Enedis
            </Button>
          </a>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              placeholder="Collez votre token ici..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full h-32 p-3 rounded-lg border border-gray-200 text-sm resize-none"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Connecter mon compteur"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnexionLinky;
