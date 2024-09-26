const API_URL = 'http://localhost:5000'; 

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password: password }), 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed.');
  }

  const data = await response.json();
  return data;
};
