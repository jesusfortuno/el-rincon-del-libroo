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

// Update the fetchBooks function to properly handle the database connection
export const fetchBooks = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "books")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    console.log("Fetched books:", data)
    return data || []
  } catch (error) {
    console.error("Error fetching books:", error)
    // Return mock data if database connection fails
    return [
      {
        id: 1,
        title: "El Mesías de Dune",
        author: "Frank Herbert",
        cover: "/src/imagen/el-mesias-de-dune-las-cronicas-de-dune-02.jpg",
        price: 19.99,
        discount: 10,
        description: "Segunda novela de la saga Dune, continuando la historia de Paul Atreides.",
        publisher: "Debolsillo",
        publish_date: "2020-05-15",
        pages: 350,
        isbn: "9788497596824",
        language: "Español",
        category: "books",
        genre: "scifi",
        rating: 4.7,
        review_count: 128,
        stock: 15,
        sales: 230,
      },
      {
        id: 2,
        title: "Fundación",
        author: "Isaac Asimov",
        cover: "/placeholder.svg?height=400&width=300",
        price: 18.5,
        discount: 0,
        description: "Primera novela de la serie Fundación, una obra maestra de la ciencia ficción.",
        publisher: "Debolsillo",
        publish_date: "2019-10-10",
        pages: 320,
        isbn: "9788497596725",
        language: "Español",
        category: "books",
        genre: "scifi",
        rating: 4.8,
        review_count: 156,
        stock: 20,
        sales: 310,
      },
    ]
  }
}

// Update the fetchComics function to properly handle the database connection
export const fetchComics = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "comics")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    console.log("Fetched comics:", data)
    return data || []
  } catch (error) {
    console.error("Error fetching comics:", error)
    // Return mock data if database connection fails
    return [
      {
        id: 3,
        title: "Watchmen",
        author: "Alan Moore",
        cover: "/placeholder.svg?height=400&width=300",
        price: 22.99,
        discount: 5,
        description: "Obra maestra del cómic que revolucionó el género de superhéroes.",
        publisher: "ECC Ediciones",
        publish_date: "2019-03-20",
        pages: 416,
        isbn: "9788417665432",
        language: "Español",
        category: "comics",
        genre: "superhero",
        rating: 4.9,
        review_count: 203,
        stock: 18,
        sales: 275,
      },
      {
        id: 4,
        title: "Batman: El regreso del Caballero Oscuro",
        author: "Frank Miller",
        cover: "/placeholder.svg?height=400&width=300",
        price: 21.5,
        discount: 0,
        description: "Una de las historias más influyentes de Batman, ambientada en un futuro distópico.",
        publisher: "ECC Ediciones",
        publish_date: "2019-06-15",
        pages: 224,
        isbn: "9788417665789",
        language: "Español",
        category: "comics",
        genre: "superhero",
        rating: 4.8,
        review_count: 178,
        stock: 12,
        sales: 245,
      },
    ]
  }
}

// Update the fetchManga function to properly handle the database connection
export const fetchManga = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "manga")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    console.log("Fetched manga:", data)
    return data || []
  } catch (error) {
    console.error("Error fetching manga:", error)
    // Return mock data if database connection fails
    return [
      {
        id: 5,
        title: "Berserk Vol. 1",
        author: "Kentaro Miura",
        cover: "/placeholder.svg?height=400&width=300",
        price: 15.99,
        discount: 0,
        description: "El inicio de una de las series de manga más aclamadas de todos los tiempos.",
        publisher: "Panini Manga",
        publish_date: "2019-11-10",
        pages: 224,
        isbn: "9788491735472",
        language: "Español",
        category: "manga",
        genre: "seinen",
        rating: 4.9,
        review_count: 245,
        stock: 25,
        sales: 320,
      },
      {
        id: 6,
        title: "One Piece Vol. 98",
        author: "Eiichiro Oda",
        cover: "/placeholder.svg?height=400&width=300",
        price: 8.95,
        discount: 0,
        description: "Continúa la aventura del Rey de los Piratas en este nuevo volumen.",
        publisher: "Planeta Cómic",
        publish_date: "2021-02-23",
        pages: 192,
        isbn: "9788491739876",
        language: "Español",
        category: "manga",
        genre: "shonen",
        rating: 4.8,
        review_count: 187,
        stock: 30,
        sales: 410,
      },
    ]
  }
}

// Update the fetchAudiobooks function to properly handle the database connection
export const fetchAudiobooks = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "audiobooks")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    console.log("Fetched audiobooks:", data)
    return data || []
  } catch (error) {
    console.error("Error fetching audiobooks:", error)
    // Return mock data if database connection fails
    return [
      {
        id: 7,
        title: "Harry Potter y la piedra filosofal",
        author: "J.K. Rowling",
        cover: "/placeholder.svg?height=400&width=300",
        price: 24.99,
        discount: 15,
        description: "El inicio de la saga Harry Potter en formato audiolibro.",
        publisher: "Audible",
        publish_date: "2020-01-15",
        pages: null,
        isbn: "9788498387476",
        language: "Español",
        category: "audiobooks",
        genre: "fantasy",
        rating: 4.9,
        review_count: 312,
        stock: 999,
        sales: 520,
      },
      {
        id: 8,
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        cover: "/placeholder.svg?height=400&width=300",
        price: 29.99,
        discount: 10,
        description: "La obra maestra del realismo mágico narrada por actores profesionales.",
        publisher: "Audible",
        publish_date: "2019-08-10",
        pages: null,
        isbn: "9788497592208",
        language: "Español",
        category: "audiobooks",
        genre: "fiction",
        rating: 4.7,
        review_count: 178,
        stock: 999,
        sales: 290,
      },
    ]
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
