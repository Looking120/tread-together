const API_BASE_URL = 'https://localhost:7294/api';

export const signIn = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Échec de la connexion...');
  }

  return response.json();
};

export const signUp = async (firstName, lastName, birthDate, userName, email, password, confirmPassword) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      birthDate,
      userName,
      email,
      password,
      confirmPassword,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Échec de l'inscription...");
  }

  return response.json();
};

export const signOut = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/auth/signout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error('Échec de la déconnexion...');
  }

  return response.json();
};