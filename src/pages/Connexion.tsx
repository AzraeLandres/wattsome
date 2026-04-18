import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, type SyntheticEvent } from "react";
const Connexion = () => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mdp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("nom", data.user.nom);
      navigate("/dashboard");
    } catch {
      setError("Erreur serveur, réessayez plus tard");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md min-h-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-purple-800">
            Connexion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Entrez votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mdp">Mot de passe</Label>
              <Input
                id="mdp"
                type="password"
                placeholder="Entrez votre mot de passe"
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800"
            >
              Se connecter
            </Button>
            <p className="text-center text-sm">
              <Link to="/inscription" className="text-purple-700 underline">
                Je n'ai pas encore de compte
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Connexion;
