import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import AuthContextProvider from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <AuthContextProvider>
      <Toaster />
      <main className="dark text-foreground bg-background">
        <App />
      </main>
    </AuthContextProvider>
  </NextUIProvider>
);
