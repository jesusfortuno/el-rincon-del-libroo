// Simulación de una API para el proyecto
// En un proyecto real, esto se conectaría a un backend

// Base de datos simulada
const products = [
    {
      id: "1",
      title: "El nombre del viento",
      author: "Patrick Rothfuss",
      cover: "/placeholder.svg?height=400&width=300",
      price: 22.5,
      discount: 10,
      description:
        "En una posada en tierra de nadie, un hombre se dispone a relatar su historia. Una historia que nadie ha oído jamás. La historia de un hombre, que se convirtió en leyenda. Su nombre es Kvothe. Ahora vive bajo un nombre falso y regenta una pequeña posada rural con su discípulo y amigo Bast. Nadie sabe quién es en realidad, ni los rumores que circulan sobre él. Hasta que un día, un cronista lo reconoce y le ruega que le revele su historia, la verdadera historia.",
      publisher: "Plaza & Janés",
      publishDate: "2009-03-15",
      pages: 880,
      isbn: "9788401352836",
      language: "Español",
      category: "books",
      genre: "fantasy",
      rating: 4.8,
      reviewCount: 1243,
      stock: 15,
      sales: 5432,
      featured: true,
      newRelease: false,
      bestSeller: true,
    },
    {
      id: "2",
      title: "Dune",
      author: "Frank Herbert",
      cover: "/placeholder.svg?height=400&width=300",
      price: 19.95,
      discount: 0,
      description:
        "Dune relata la historia de Paul Atreides, un joven brillante y dotado de un destino que va más allá de su comprensión, que deberá viajar al planeta más peligroso del universo para asegurar el futuro de su familia y de su pueblo. A medida que fuerzas malévolas estallan en conflicto por el suministro exclusivo del recurso más preciado que existe, solo sobrevivirán aquellos que logren vencer al miedo.",
      publisher: "Debolsillo",
      publishDate: "2020-09-01",
      pages: 784,
      isbn: "9788466353779",
      language: "Español",
      category: "books",
      genre: "scifi",
      rating: 4.7,
      reviewCount: 987,
      stock: 8,
      sales: 4321,
      featured: true,
      newRelease: false,
      bestSeller: true,
    },
    {
      id: "3",
      title: "Proyecto Hail Mary",
      author: "Andy Weir",
      cover: "/placeholder.svg?height=400&width=300",
      price: 21.9,
      discount: 15,
      description:
        "Ryland Grace es el único superviviente de una misión desesperada. Si fracasa, la humanidad y la Tierra misma perecerán. Pero ahora mismo, no lo sabe. No recuerda ni su nombre, ni su misión, ni cómo completarla. Todo lo que sabe es que ha estado en coma inducido durante mucho tiempo. Acaba de despertar y se encuentra a millones de kilómetros de su hogar, con solo dos cadáveres como compañía.",
      publisher: "Nova",
      publishDate: "2021-05-04",
      pages: 496,
      isbn: "9788417347987",
      language: "Español",
      category: "books",
      genre: "scifi",
      rating: 4.9,
      reviewCount: 756,
      stock: 12,
      sales: 3210,
      featured: false,
      newRelease: true,
      bestSeller: false,
    },
    {
      id: "4",
      title: "La Sombra del Viento",
      author: "Carlos Ruiz Zafón",
      cover: "/placeholder.svg?height=400&width=300",
      price: 18.9,
      discount: 0,
      description:
        "Un amanecer de 1945, un muchacho es conducido por su padre a un misterioso lugar oculto en el corazón de la ciudad vieja: El Cementerio de los Libros Olvidados. Allí encuentra La Sombra del Viento, un libro maldito que cambiará el rumbo de su vida y le arrastrará a un laberinto de intrigas y secretos enterrados en el alma oscura de la ciudad.",
      publisher: "Planeta",
      publishDate: "2001-05-01",
      pages: 544,
      isbn: "9788408043645",
      language: "Español",
      category: "books",
      genre: "mystery",
      rating: 4.6,
      reviewCount: 1876,
      stock: 20,
      sales: 7654,
      featured: true,
      newRelease: false,
      bestSeller: true,
    },
    {
      id: "5",
      title: "Berserk Deluxe Vol. 1",
      author: "Kentaro Miura",
      cover: "/placeholder.svg?height=400&width=300",
      price: 49.99,
      discount: 10,
      description:
        "Edición de lujo del manga Berserk. Incluye los volúmenes 1-3 en un tomo de tapa dura con sobrecubierta. Guts, el Guerrero Negro, busca refugio del reino mortal en una lucha contra destinos demoníacos. Armado con una espada gigante y una fuerza sobrehumana, Guts es un superviviente con un trágico pasado y una marca que lo atrae hacia las fuerzas del mal.",
      publisher: "Panini Comics",
      publishDate: "2019-03-12",
      pages: 696,
      isbn: "9788467940626",
      language: "Español",
      category: "manga",
      genre: "fantasy",
      rating: 4.9,
      reviewCount: 543,
      stock: 5,
      sales: 2345,
      featured: true,
      newRelease: false,
      bestSeller: true,
    },
    {
      id: "6",
      title: "Chainsaw Man Vol. 1",
      author: "Tatsuki Fujimoto",
      cover: "/placeholder.svg?height=400&width=300",
      price: 9.95,
      discount: 0,
      description:
        "Denji es un joven atrapado en la pobreza extrema que trabaja para saldar la deuda de su padre fallecido con la yakuza trabajando como cazador de demonios, con la ayuda de Pochita, su fiel compañero canino. Pero incluso con un demonio como mascota, Denji está viviendo una vida miserable en el fondo de la sociedad. Cuando es traicionado, Denji se fusiona con Pochita para sobrevivir, convirtiéndose en un híbrido humano-demonio con la capacidad de transformar partes de su cuerpo en motosierras.",
      publisher: "Norma Editorial",
      publishDate: "2020-10-29",
      pages: 192,
      isbn: "9788467944563",
      language: "Español",
      category: "manga",
      genre: "action",
      rating: 4.7,
      reviewCount: 432,
      stock: 18,
      sales: 3456,
      featured: false,
      newRelease: true,
      bestSeller: true,
    },
    {
      id: "7",
      title: "Watchmen",
      author: "Alan Moore, Dave Gibbons",
      cover: "/placeholder.svg?height=400&width=300",
      price: 29.95,
      discount: 5,
      description:
        "En una historia alternativa de los Estados Unidos donde los superhéroes son considerados forajidos, Watchmen sigue a un grupo de justicieros retirados mientras uno de ellos es asesinado, lo que los lleva a descubrir una conspiración que podría cambiar el curso de la historia.",
      publisher: "ECC Ediciones",
      publishDate: "2019-05-21",
      pages: 416,
      isbn: "9788417665159",
      language: "Español",
      category: "comics",
      genre: "superhero",
      rating: 4.8,
      reviewCount: 876,
      stock: 10,
      sales: 4567,
      featured: true,
      newRelease: false,
      bestSeller: true,
    },
    {
      id: "8",
      title: "Saga Vol. 1",
      author: "Brian K. Vaughan, Fiona Staples",
      cover: "/placeholder.svg?height=400&width=300",
      price: 16.5,
      discount: 0,
      description:
        "Cuando dos soldados de bandos opuestos de una guerra galáctica se enamoran y tienen una hija, se convierten en fugitivos perseguidos por ambos lados del conflicto. Saga es una serie de ciencia ficción/fantasía que sigue a esta familia mientras intentan sobrevivir y criar a su hija en un universo peligroso.",
      publisher: "Planeta Cómic",
      publishDate: "2013-03-19",
      pages: 168,
      isbn: "9788468478685",
      language: "Español",
      category: "comics",
      genre: "scifi",
      rating: 4.9,
      reviewCount: 765,
      stock: 7,
      sales: 3789,
      featured: false,
      newRelease: false,
      bestSeller: true,
    },
    {
      id: "9",
      title: "El Silmarillion",
      author: "J.R.R. Tolkien",
      cover: "/placeholder.svg?height=400&width=300",
      price: 24.95,
      discount: 0,
      description:
        "El Silmarillion cuenta la historia de la Primera Edad de la Tierra Media, cuando Morgoth, el primer Señor Oscuro, habitaba en la Tierra Media y los Altos Elfos le hicieron la guerra para recuperar los Silmarils. Es la historia antigua a la que los personajes de El Señor de los Anillos miran atrás, y en cuyos acontecimientos algunos de ellos, como Elrond y Galadriel, tomaron parte.",
      publisher: "Minotauro",
      publishDate: "2002-09-01",
      pages: 576,
      isbn: "9788445073803",
      language: "Español",
      category: "books",
      genre: "fantasy",
      rating: 4.5,
      reviewCount: 654,
      stock: 9,
      sales: 2987,
      featured: false,
      newRelease: false,
      bestSeller: false,
    },
    {
      id: "10",
      title: "Harry Potter y la piedra filosofal",
      author: "J.K. Rowling",
      cover: "/placeholder.svg?height=400&width=300",
      price: 17.95,
      discount: 0,
      description:
        "Harry Potter nunca ha oído hablar de Hogwarts hasta que empiezan a caer cartas en el felpudo del número 4 de Privet Drive. Llevan la dirección escrita con tinta verde en un sobre de pergamino amarillento con un sello de lacre púrpura, y sus horripilantes tíos las confiscan rápidamente. Más tarde, en su undécimo cumpleaños, Rubeus Hagrid, un hombre gigantesco con ojos como escarabajos negros, irrumpe con una noticia extraordinaria: Harry Potter es un mago y le han concedido una plaza en el Colegio Hogwarts de Magia y Hechicería.",
      publisher: "Salamandra",
      publishDate: "1999-03-01",
      pages: 256,
      isbn: "9788478884452",
      language: "Español",
      category: "books",
      genre: "fantasy",
      rating: 4.8,
      reviewCount: 2345,
      stock: 25,
      sales: 9876,
      featured: true,
      newRelease: false,
      bestSeller: true,
    },
    {
      id: "11",
      title: "El Hobbit (Audiolibro)",
      author: "J.R.R. Tolkien",
      cover: "/placeholder.svg?height=400&width=300",
      price: 24.99,
      discount: 20,
      description:
        "Versión en audiolibro de la clásica novela de fantasía. Bilbo Bolsón disfruta de una cómoda y apacible vida en La Comarca, hasta que un día el mago Gandalf y una compañía de enanos llaman a su puerta y le embarcan en una aventura para recuperar el tesoro custodiado por el dragón Smaug el Magnífico.",
      publisher: "Audible",
      publishDate: "2019-10-15",
      duration: "11h 15m",
      narrator: "Arturo López",
      language: "Español",
      category: "audiobooks",
      genre: "fantasy",
      rating: 4.7,
      reviewCount: 432,
      stock: 999,
      sales: 1234,
      featured: true,
      newRelease: false,
      bestSeller: false,
    },
    {
      id: "12",
      title: "Sapiens: De animales a dioses (Audiolibro)",
      author: "Yuval Noah Harari",
      cover: "/placeholder.svg?height=400&width=300",
      price: 29.99,
      discount: 0,
      description:
        "Versión en audiolibro del bestseller internacional. Hace 100.000 años, al menos seis especies de humanos habitaban la Tierra. Hoy solo queda una, la nuestra: Homo sapiens. ¿Cómo logró nuestra especie imponerse en la lucha por la existencia?",
      publisher: "Audible",
      publishDate: "2020-02-20",
      duration: "15h 30m",
      narrator: "Carlos Manuel Vesga",
      language: "Español",
      category: "audiobooks",
      genre: "nonfiction",
      rating: 4.8,
      reviewCount: 567,
      stock: 999,
      sales: 2345,
      featured: false,
      newRelease: true,
      bestSeller: true,
    },
  ]
  
  // Funciones de la API simulada
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  
  export const fetchFeaturedProducts = async () => {
    await delay(500) // Simular latencia de red
    return products.filter((product) => product.featured)
  }
  
  export const fetchNewReleases = async () => {
    await delay(500)
    return products.filter((product) => product.newRelease)
  }
  
  export const fetchBestSellers = async () => {
    await delay(500)
    return products.filter((product) => product.bestSeller)
  }
  
  export const fetchBooks = async () => {
    await delay(800)
    return products.filter((product) => product.category === "books")
  }
  
  export const fetchComics = async () => {
    await delay(800)
    return products.filter((product) => product.category === "comics")
  }
  
  export const fetchManga = async () => {
    await delay(800)
    return products.filter((product) => product.category === "manga")
  }
  
  export const fetchAudiobooks = async () => {
    await delay(800)
    return products.filter((product) => product.category === "audiobooks")
  }
  
  export const fetchProductById = async (id) => {
    await delay(600)
    return products.find((product) => product.id === id) || null
  }
  
  export const fetchRelatedProducts = async (category, excludeId) => {
    await delay(700)
    return products.filter((product) => product.category === category && product.id !== excludeId).slice(0, 4)
  }
  
  export const searchProducts = async (query) => {
    await delay(500)
    const lowercaseQuery = query.toLowerCase()
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowercaseQuery) || product.author.toLowerCase().includes(lowercaseQuery),
    )
  }
  
  // Simulación de autenticación
  const users = [
    {
      id: "1",
      name: "Usuario Demo",
      email: "demo@example.com",
      password: "password123", // En un sistema real, esto estaría hasheado
    },
  ]
  
  export const login = async (email, password) => {
    await delay(800)
    const user = users.find((u) => u.email === email && u.password === password)
  
    if (user) {
      const { password, ...userWithoutPassword } = user
      return { success: true, user: userWithoutPassword }
    }
  
    return { success: false, message: "Credenciales incorrectas" }
  }
  
  export const register = async (name, email, password) => {
    await delay(1000)
  
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
  
  