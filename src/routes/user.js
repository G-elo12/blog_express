import { Router } from "express";
import { logincontroller, registercontroller } from "../controllers/auth.js";

export const routesauth = Router()

routesauth.post("/register",registercontroller)
routesauth.post("/login",logincontroller)