import { createClient } from "@supabase/supabase-js"

// Obtener las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Verificar si las variables están definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Supabase URL o Anon Key no están definidas. Por favor, configura las variables de entorno.")
  console.log("Debes crear un archivo .env en la raíz del proyecto con:")
  console.log("VITE_SUPABASE_URL=tu_url_de_supabase")
  console.log("VITE_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase")
}

// Crear el cliente de Supabase con valores predeterminados si no están definidos
export const supabase = createClient(
  supabaseUrl || "https://example.supabase.co",
  supabaseAnonKey || "fallback-key-for-development",
)

// Función para verificar la conexión
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from("products").select("count").limit(1)
    if (error) {
      console.error("❌ Error de conexión a Supabase:", error)
      return false
    }
    console.log("✅ Conexión a Supabase exitosa")
    return true
  } catch (error) {
    console.error("❌ Error de conexión a Supabase:", error)
    return false
  }
}
