import { databases } from "../config/databases.js";

const register = async (username, email, password) => {
  try {
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const [result] = await databases.query(query, [username, email, password]);
    return result.insertId;
  } catch (err) {
    throw new Error("Error al registrar el usuario: " + err.message);
  }
};

const login = async (email) => {
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [result] = await databases.query(query, [email]);
    if (result.length === 0) {
      return null;
    }
    return result[0];
  } catch (err) {
    throw new Error("Error al iniciar sesión: " + err.message);
  }
};

export { register, login };
