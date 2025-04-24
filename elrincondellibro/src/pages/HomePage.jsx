"use client"

import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { supabase, checkSupabaseConnection } from "../lib/supabase"

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState(null)

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkSupabaseConnection()
      setConnectionStatus(isConnected)
    }

    checkConnection()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        // Fetch all products
        const { data, error } = await supabase.from("products").select("*").limit(8)

        if (error) throw error

        console.log("Fetched products:", data)
        setProducts(data || [])
        setLoading(false)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (error) {
    return (
      <div className="container py-12">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
          <h2 className="text-xl font-bold mb-2">Error al cargar los productos</h2>
          <p>{error}</p>
          <p className="mt-2">
            Estado de conexión a Supabase:{" "}
            {connectionStatus === null ? "Verificando..." : connectionStatus ? "Conectado" : "Error de conexión"}
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container py-12 flex justify-center items-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="home-page">
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">El Rincón del Libro</h1>

        {products.length === 0 ? (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-700">
            <p>No se encontraron productos en la base de datos.</p>
            <p className="mt-2">
              Estado de conexión a Supabase:{" "}
              {connectionStatus === null ? "Verificando..." : connectionStatus ? "Conectado" : "Error de conexión"}
            </p>
          </div>
        ) : (
          <>
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Productos</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default HomePage
