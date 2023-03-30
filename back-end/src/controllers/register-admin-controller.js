import { Router } from "express";
import { registerAdmin } from "../services/register-admin-service.js";

export const registerAdminRouter = Router();

registerAdminRouter.post("/", registerAdmin);
