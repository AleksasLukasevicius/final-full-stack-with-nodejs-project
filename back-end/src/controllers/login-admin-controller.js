import { Router } from "express";
import { loginAdmin } from "../services/login-admin.js";

export const loginAdminRouter = Router();

loginAdminRouter.post("/", loginAdmin);
