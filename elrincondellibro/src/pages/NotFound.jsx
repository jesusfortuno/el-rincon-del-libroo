import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Página no encontrada</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        Volver a la página principal
      </Link>
    </div>
  )
}

export default NotFound

