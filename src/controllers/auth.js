import { hash, compare } from "bcrypt";
import { login, register } from "../services/auth.js";
import jwt from "jsonwebtoken";

const registercontroller = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ message: "Faltan datos" });
  }

  try {
    const passwordhash = await hash(password, 10);
    const result = await register(username, email, passwordhash);
    res.status(201).send({ id: result });
  } catch (err) {
    res.status(500).send({ message: "Error en el registro", err });
  }
};

const logincontroller = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Faltan datos" });
  }

  try {
    const user = await login(email);

    if (!user) {
      return res.status(401).send({ message: "Usuario no encontrado" });
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Contraseña incorrecta" });
    }

    /*const token = jsonwebtoken.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );*/

    const token=jwt.sign(
        {id:user.id},process.env.SECRET_KEY||"secreto",{expiresIn:"1d"}
    )

    res.status(200).send({ message: "Login exitoso", id: user.id ,
    token});
  } catch (err) {
    res.status(500).send({ message: "Error en el login", err });
  }
};

export { registercontroller, logincontroller };
