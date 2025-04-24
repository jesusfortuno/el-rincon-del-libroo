import { supabase } from "../lib/supabase"

// Fetch featured products from Supabase
export const fetchFeaturedProducts = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

// Fetch new releases from Supabase
export const fetchNewReleases = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("new_release", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching new releases:", error)
    return []
  }
}

// Fetch best sellers from Supabase
export const fetchBestSellers = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("best_seller", true)
      .order("sales", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching best sellers:", error)
    return []
  }
}

// Fetch books from Supabase
export const fetchBooks = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "books")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching books:", error)
    return []
  }
}

// Fetch comics from Supabase
export const fetchComics = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "comics")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching comics:", error)
    return []
  }
}

// Fetch manga from Supabase
export const fetchManga = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "manga")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching manga:", error)
    return []
  }
}

// Fetch audiobooks from Supabase
export const fetchAudiobooks = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "audiobooks")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching audiobooks:", error)
    return []
  }
}

// Fetch product by ID from Supabase
export const fetchProductById = async (id) => {
  try {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error) throw error
    return data || null
  } catch (error) {
    console.error("Error fetching product by ID:", error)
    return null
  }
}

// Fetch related products from Supabase
export const fetchRelatedProducts = async (category, excludeId) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .neq("id", excludeId)
      .limit(4)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}

// Search products from Supabase
export const searchProducts = async (query) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`title.ilike.%${query}%,author.ilike.%${query}%`)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error searching products:", error)
    return []
  }
}

// Authentication functions (these remain the same as they're just simulations)
const users = [
  {
    id: "1",
    name: "Usuario Demo",
    email: "demo@example.com",
    password: "password123", // In a real system, this would be hashed
  },
]

export const login = async (email, password) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    const { password, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
  }

  return { success: false, message: "Credenciales incorrectas" }
}

export const register = async (name, email, password) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (users.some((u) => u.email === email)) {
    return { success: false, message: "El correo electrónico ya está registrado" }
  }

  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    password,
  }

  users.push(newUser)

  const { password: _, ...userWithoutPassword } = newUser
  return { success: true, user: userWithoutPassword }
}
