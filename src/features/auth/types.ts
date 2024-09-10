import { User } from "firebase/auth";
import { LoginDto } from "./schemas";

export type AuthState = {
  user: User | null;
  isValidatingUser: boolean;
  isLoggingIn: boolean;
};

export type AuthContext = AuthState & {
  loginWithEmailAndPassword: (data: LoginDto) => Promise<void>;
  logout: () => void;
};

export type AuthAction =
  | { type: "START_LOG_IN" }
  | { type: "END_LOG_IN"; payload: Pick<AuthState, "user"> }
  | { type: "LOG_OUT" }
  | { type: "START_VALIDATING_USER" }
  | { type: "END_VALIDATING_USER"; payload: Pick<AuthState, "user"> };
