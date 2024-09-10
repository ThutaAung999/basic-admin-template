import { ReactNode, useEffect, useReducer } from "react";
import { authContext } from "../contexts";
import { AuthAction, AuthContext, AuthState } from "../types";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/libs/firebase";
import { FirebaseError } from "firebase/app";
import { toast } from "@/libs/mantine-toast";

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "START_LOG_IN":
      return {
        ...state,
        isLoggingIn: true,
      };

    case "END_LOG_IN":
      return {
        ...state,
        ...action.payload,
        isLoggingIn: false,
      };

    case "LOG_OUT":
      return {
        ...state,
        user: null,
        isValidatingUser: false,
      };

    case "START_VALIDATING_USER":
      return {
        ...state,
        isValidatingUser: true,
      };

    case "END_VALIDATING_USER":
      return {
        ...state,
        ...action.payload,
        isValidatingUser: false,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    isValidatingUser: true,
    isLoggingIn: false,
  } as AuthState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      dispatch({ type: "END_VALIDATING_USER", payload: { user: authUser } });
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmailAndPassword: AuthContext["loginWithEmailAndPassword"] =
    async ({ email, password, rememberMe }) => {
      dispatch({ type: "START_LOG_IN" });
      try {
        const persistence = rememberMe
          ? browserLocalPersistence
          : browserSessionPersistence;
        await setPersistence(auth, persistence);
        const credentials = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        dispatch({ type: "END_LOG_IN", payload: { user: credentials.user } });
        window.location.replace("/");
      } catch (err) {
        if (err instanceof FirebaseError) {
          if (
            err.code === "auth/wrong-password" ||
            err.code === "auth/user-not-found"
          ) {
            toast.error({ message: "Invalid email or password." });
          } else {
            toast.error({
              message: "There was an error logging you in. Please try again.",
            });
          }
        }
        dispatch({ type: "END_LOG_IN", payload: { user: null } });
      }
    };

  const logout: AuthContext["logout"] = async () => {
    await signOut(auth);
    dispatch({ type: "LOG_OUT" });
    window.location.replace("/auth/login");
  };

  return (
    <authContext.Provider
      value={{
        ...state,
        loginWithEmailAndPassword,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
