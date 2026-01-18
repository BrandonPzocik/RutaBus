const API_URL = import.meta.env.VITE_API_URL;

// LOGIN
export const loginUser = async (email, contrasenia) => {
  try {
    console.log("API URL:", API_URL);
    console.log("datos enviados:", { email, contrasenia });

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, contrasenia })
    });

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error("El servidor no devolvió JSON válido");
    }

    if (!response.ok) {
      throw new Error(data?.mensaje || "Error del servidor");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// REGISTER
export const registerUser = async (nombre, email, contrasenia, FecNac) => {
  try {
    console.log("API URL:", API_URL);

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, email, contrasenia, FecNac })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "Error al registrar usuario");
    }

    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
