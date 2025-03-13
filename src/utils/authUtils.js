const API_BASE_URL = 'https://localhost:7294/api';

// Connexion
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

  const data = await response.json();

  // Stocker les informations de l'utilisateur dans le localStorage
  const user = {
    id: data.id,
    userName: data.userName,
    email: data.email,
    role: data.role,
  };
  localStorage.setItem('user', JSON.stringify(user)); // Stocker l'objet user
  localStorage.setItem('token', data.accessToken); // Stocker le token

  return data;
};

// Inscription
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

  const data = await response.json();

  // Stocker les informations de l'utilisateur et le token dans le localStorage
  localStorage.setItem('user', JSON.stringify(data.user));
  localStorage.setItem('token', data.token);

  return data;
};

// Déconnexion
export const signOut = async () => {
  try {
    // Supprimer les informations de l'utilisateur et le token du localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};