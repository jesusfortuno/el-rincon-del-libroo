// Función para verificar y mostrar el estado de las variables de entorno
export const debugEnvironmentVariables = () => {
    const variables = ["SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]
  
    console.log("Environment Variables Status:")
    variables.forEach((variable) => {
      const value = process.env[variable]
      console.log(`${variable}: ${value ? "Defined ✅" : "Missing ❌"}`)
    })
  }
  
  // Función para imprimir información de depuración sobre la estructura de datos
  export const debugDataStructure = (data) => {
    if (!data) {
      console.log("Data is null or undefined")
      return
    }
  
    if (Array.isArray(data)) {
      console.log(`Array with ${data.length} items`)
      if (data.length > 0) {
        console.log("First item structure:", Object.keys(data[0]))
        console.log("Sample item:", data[0])
      }
    } else {
      console.log("Object structure:", Object.keys(data))
      console.log("Data:", data)
    }
  }
  