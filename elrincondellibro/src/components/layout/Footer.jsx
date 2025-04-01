import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-title">El Rincón del Libro</h3>
            <p className="footer-description">
              Tu librería online especializada en literatura fantástica, ciencia ficción, cómics, manga y mucho más.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Categorías</h3>
            <ul className="footer-links">
              <li>
                <Link to="/libros" className="footer-link">
                  Libros
                </Link>
              </li>
              <li>
                <Link to="/comics" className="footer-link">
                  Comics
                </Link>
              </li>
              <li>
                <Link to="/manga" className="footer-link">
                  Manga
                </Link>
              </li>
              <li>
                <Link to="/audiolibros" className="footer-link">
                  Audiolibros
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Enlaces</h3>
            <ul className="footer-links">
              <li>
                <Link to="/eventos" className="footer-link">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="footer-link">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="footer-link">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Contacto</h3>
            <ul className="contact-list">
              <li className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <span className="contact-text">Calle Librería 123, Barcelona</span>
              </li>
              <li className="contact-item">
                <Phone size={18} className="contact-icon" />
                <span className="contact-text">+34 123 456 789</span>
              </li>
              <li className="contact-item">
                <Mail size={18} className="contact-icon" />
                <span className="contact-text">info@elrincondellibro.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} El Rincón del Libro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

