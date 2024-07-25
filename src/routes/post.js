import { Router } from "express";
import { post, get, deletes, update, getById, busqueda,GetByUserID} from "../controllers/post.js";
import { validartoken } from "../middleware/validitacion.js";

const routesPost = Router();

routesPost.get("/", get);
routesPost.get("/sheard", busqueda);
routesPost.get("/byid/:idpost", getById);
routesPost.get("/user/:idUser",GetByUserID)
routesPost.post("/", validartoken, post); // Se cambió aquí
routesPost.delete("/:id", validartoken, deletes); // Se cambió aquí
routesPost.put("/:id", validartoken, update); // Se cambió aquí

export { routesPost };
