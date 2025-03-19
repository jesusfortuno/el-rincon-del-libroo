import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">El Rincón del Libro</h3>
            <p className="text-gray-300 mb-4">
              Tu librería online especializada en literatura fantástica, ciencia ficción, cómics, manga y mucho más.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/libros" className="text-gray-300 hover:text-white">
                  Libros
                </Link>
              </li>
              <li>
                <Link to="/comics" className="text-gray-300 hover:text-white">
                  Comics
                </Link>
              </li>
              <li>
                <Link to="/manga" className="text-gray-300 hover:text-white">
                  Manga
                </Link>
              </li>
              <li>
                <Link to="/audiolibros" className="text-gray-300 hover:text-white">
                  Audiolibros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/eventos" className="text-gray-300 hover:text-white">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="text-gray-300 hover:text-white">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-gray-300 hover:text-white">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin size={18} className="text-gray-300" />
                <span className="text-gray-300">Calle Librería 123, Barcelona</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-gray-300" />
                <span className="text-gray-300">+34 123 456 789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-gray-300" />
                <span className="text-gray-300">info@elrincondellibro.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} El Rincón del Libro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

