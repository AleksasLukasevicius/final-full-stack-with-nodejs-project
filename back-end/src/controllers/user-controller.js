import { Router } from "express";
import { isLoggedIn } from "../services/token-middleware.js";
import {
  deleteUser,
  getUser,
  getUsers,
  registerUser,
  updateUser,
} from "../services/user-service.js";

export const userRouter = Router();

userRouter.get("/", isLoggedIn, getUsers);
userRouter.get("/:id", isLoggedIn, getUser);
userRouter.post("/", isLoggedIn, registerUser);
userRouter.delete("/:id", isLoggedIn, deleteUser);
userRouter.patch("/:id", isLoggedIn, updateUser);
