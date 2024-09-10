import { createContext } from "react";
import { AuthContext } from "../types";

export const authContext = createContext<AuthContext>({
  user: null,
  isValidatingUser: true,
  isLoggingIn: false,
  loginWithEmailAndPassword: async () => {},
  logout: async () => {},
});
