import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./styles/index.css"
import "./styles/theme.css" // Importar los estilos del tema

// Mostrar información de las variables de entorno (sin revelar valores completos)
console.log("Variables de entorno:")
console.log("VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL ? "✅ Definida" : "❌ No definida")
console.log("VITE_SUPABASE_ANON_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "✅ Definida" : "❌ No definida")

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
