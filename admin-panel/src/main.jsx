import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { NextUIProvider } from "@nextui-org/react";
import { AuthContextProvider } from "./context/AuthContext.js";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <AuthContextProvider>
      <main className="dark text-foreground bg-background">
        <App />
      </main>
    </AuthContextProvider>
  </NextUIProvider>
);
