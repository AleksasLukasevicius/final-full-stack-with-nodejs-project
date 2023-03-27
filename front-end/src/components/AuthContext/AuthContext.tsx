import { createContext } from "react";
import type { TAuthContext } from "./types";

export const AuthContext = createContext<TAuthContext>({} as TAuthContext);
