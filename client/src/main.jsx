import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import AuthContextProvider from "./context/AuthContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <AuthContextProvider>
      <CartContextProvider>
        <Toaster />
        <main className="light text-foreground bg-background">
          <App />
        </main>
      </CartContextProvider>
    </AuthContextProvider>
  </NextUIProvider>
);
