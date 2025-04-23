"use client"

import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import Logo from "./Logo"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <Logo />
            <p className="footer-tagline">
              Tu librería especializada en literatura fantástica, ciencia ficción, cómics, manga y mucho más.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div className="footer-nav">
            <div className="footer-nav-column">
              <h3 className="footer-heading">Categorías</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/libros">Libros</Link>
                </li>
                <li>
                  <Link to="/comics">Comics</Link>
                </li>
                <li>
                  <Link to="/manga">Manga</Link>
                </li>
                <li>
                  <Link to="/audiolibros">Audiolibros</Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav-column">
              <h3 className="footer-heading">Enlaces</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/eventos">Eventos</Link>
                </li>
                <li>
                  <Link to="/about">Sobre nosotros</Link>
                </li>
                <li>
                  <Link to="/politica-privacidad">Política de privacidad</Link>
                </li>
                <li>
                  <Link to="/terminos">Términos y condiciones</Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav-column">
              <h3 className="footer-heading">Contacto</h3>
              <ul className="contact-info">
                <li>
                  <MapPin size={18} className="contact-icon" />
                  <span>Calle Librería 123, Barcelona</span>
                </li>
                <li>
                  <Phone size={18} className="contact-icon" />
                  <span>+34 123 456 789</span>
                </li>
                <li>
                  <Mail size={18} className="contact-icon" />
                  <span>info@elrincondellibro.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {currentYear} El Rincón del Libro. Todos los derechos reservados.</p>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background-color: var(--color-gray-900);
          color: var(--color-gray-300);
          padding: var(--spacing-12) 0 var(--spacing-6);
          margin-top: var(--spacing-16);
        }
        
        .footer-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-8);
          margin-bottom: var(--spacing-8);
        }
        
        @media (min-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr 2fr;
          }
        }
        
        .footer-logo {
          margin-bottom: var(--spacing-6);
        }
        
        .footer-tagline {
          margin: var(--spacing-4) 0;
          max-width: 300px;
          line-height: 1.6;
        }
        
        .social-links {
          display: flex;
          gap: var(--spacing-3);
          margin-top: var(--spacing-4);
        }
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--color-gray-300);
          transition: all var(--transition-normal) ease;
        }
        
        .social-link:hover {
          background-color: var(--color-primary);
          color: white;
          transform: translateY(-3px);
        }
        
        .footer-nav {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: var(--spacing-8);
        }
        
        .footer-heading {
          color: white;
          font-size: 1.125rem;
          margin-bottom: var(--spacing-4);
          position: relative;
          padding-bottom: var(--spacing-2);
        }
        
        .footer-heading::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 40px;
          height: 2px;
          background-color: var(--color-primary);
        }
        
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links li {
          margin-bottom: var(--spacing-2);
        }
        
        .footer-links a {
          color: var(--color-gray-400);
          transition: all var(--transition-normal) ease;
          display: inline-block;
        }
        
        .footer-links a:hover {
          color: white;
          transform: translateX(3px);
        }
        
        .contact-info {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .contact-info li {
          display: flex;
          align-items: flex-start;
          margin-bottom: var(--spacing-3);
        }
        
        .contact-icon {
          margin-right: var(--spacing-2);
          margin-top: 3px;
          color: var(--color-primary-light);
        }
        
        .footer-bottom {
          padding-top: var(--spacing-6);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        
        .copyright {
          font-size: 0.875rem;
          color: var(--color-gray-500);
        }
      `}</style>
    </footer>
  )
}

export default Footer
