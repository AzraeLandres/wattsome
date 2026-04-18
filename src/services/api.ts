const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
});

// Gestion utilisateur
export const getProfil = async () => {
  const response = await fetch(`${API_URL}/profil`, {
    headers: getHeaders(),
    credentials: "include",
  });
  return response.json();
};
export const deconnexion = async () => {
  await fetch(`${API_URL}/auth/deconnexion`, {
    method: "POST",
    credentials: "include",
  });
};

//Gestion compteur
export const getConsommations = async (start: string, end: string) => {
  const response = await fetch(
    `${API_URL}/consommations?start=${start}&end=${end}`,
    { headers: getHeaders(), credentials: "include" },
  );
  return response.json();
};

export const connectLinky = async (token: string) => {
  const response = await fetch(`${API_URL}/linky/connect`, {
    method: "POST",
    headers: getHeaders(),
    credentials: "include",
    body: JSON.stringify({ token }),
  });
  return response.json();
};

//Gestion alertes

export const getAlertes = async () => {
  const response = await fetch(`${API_URL}/alertes`, {
    headers: getHeaders(),
    credentials: "include",
  });
  return response.json();
};

export const marquerAlerteLue = async (id: string) => {
  const response = await fetch(`${API_URL}/alertes/${id}/lu`, {
    method: "PATCH",
    headers: getHeaders(),
    credentials: "include",
  });
  return response.json();
};
