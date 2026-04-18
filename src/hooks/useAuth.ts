import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfil } from "@/services/api";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getProfil().catch(() => {
      navigate("/connexion");
    });
  }, [navigate]);
};

export default useAuth;
