import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import { FavouritesProvider } from "./lib/context/FavouritesContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </QueryClientProvider>
  </StrictMode>
);