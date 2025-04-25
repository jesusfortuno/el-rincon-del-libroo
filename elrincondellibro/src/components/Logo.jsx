"use client"

import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/" className="logo-text">
        El Rincón del Libro
      </Link>

      <style jsx>{`
        .logo {
          display: flex;
          align-items: center;
        }
        
        .logo-text {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary);
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}

export default Logo
