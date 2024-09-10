import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./styles/theme.tsx";
import "./index.css";
import { AuthProvider } from "./features/auth/index.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider   theme={theme} >
      <AuthProvider>
        <App />
      </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
