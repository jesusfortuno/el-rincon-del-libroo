"use client"

import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <span className="logo-text">El Rincón del Libro</span>

      <style jsx>{`
        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        
        .logo-text {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary);
        }
      `}</style>
    </Link>
  )
}

export default Logo
