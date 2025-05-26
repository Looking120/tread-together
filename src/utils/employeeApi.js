const API_BASE_URL = 'https://localhost:7294/api';

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  if (!response.ok) {
    let errorMessage = `Erreur ${response.status}: ${response.statusText}`;
    
    if (contentType?.includes('application/json')) {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.title || errorMessage;
      
      if (errorData.errors) {
        errorMessage += '\n' + 
          Object.entries(errorData.errors)
            .map(([key, val]) => `${key}: ${val.join(', ')}`)
            .join('\n');
      }
    }
    
    throw new Error(errorMessage);
  }

  return contentType?.includes('application/json') 
    ? response.json() 
    : response.text();
};

const fetchApi = async (endpoint, method = 'GET', body = null) => {
  const token = localStorage.getItem('token');
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const config = {
    method,
    headers,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erreur API [${method}] ${endpoint}:`, error);
    throw error;
  }
};

// Fonctions API principales
export const getEmployees = async () => {
  try {
    const response = await fetchApi('/employees');
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des employés:", error);
    throw error;
  }
};

export const getEmployeeById = (id) => fetchApi(`/employees/${id}`);

export const updateEmployeeStatus = (employeeId, isActive) => 
  fetchApi(`/employees/${employeeId}/status`, 'PUT', { isActive });

export const getEmployeeLocation = (employeeId) => 
  fetchApi(`/employees/${employeeId}/location/current`);

export const getNearbyEmployees = (employeeId) => 
  fetchApi(`/employees/${employeeId}/location/nearby`);

export const addEmployee = (employeeData) => {
  if (!employeeData.firstName || !employeeData.lastName || !employeeData.email) {
    return Promise.reject(new Error('Les champs obligatoires sont manquants'));
  }

  return fetchApi('/employees', 'POST', {
    ...employeeData,
    birthDate: employeeData.birthDate ? new Date(employeeData.birthDate).toISOString() : null
  });
};

export const updateEmployee = (id, employeeData) => 
  fetchApi(`/employees/${id}`, 'PUT', employeeData);

export const deleteEmployee = (id) => 
  fetchApi(`/employees/${id}`, 'DELETE');