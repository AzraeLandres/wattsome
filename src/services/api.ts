const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getProfil = async () => {
  const response = await fetch(`${API_URL}/profil`, { headers: getHeaders() });
  return response.json();
};

export const getConsommations = async (start: string, end: string) => {
  const response = await fetch(
    `${API_URL}/consommations?start=${start}&end=${end}`,
    { headers: getHeaders() },
  );
  return response.json();
};

export const connectLinky = async (token: string) => {
  const response = await fetch(`${API_URL}/linky/connect`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ token }),
  });
  return response.json();
};

export const getAlertes = async () => {
  const response = await fetch(`${API_URL}/alertes`, { headers: getHeaders() });
  return response.json();
};

export const marquerAlerteLue = async (id: string) => {
  const response = await fetch(`${API_URL}/alertes/${id}/lu`, {
    method: "PATCH",
    headers: getHeaders(),
  });
  return response.json();
};
