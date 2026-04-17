import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/connexion");
    }
  }, [navigate]);
};

export default useAuth;
