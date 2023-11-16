import { Router } from "express";
import { login, register } from "../controllers/AuthController.js";

const AuthResource = Router()

AuthResource.post("/login", login)
AuthResource.post("/register", register)

export default AuthResource