"use client"

import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Página no encontrada</h2>
          <p className="not-found-message">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
          <Link to="/" className="not-found-button">
            <ArrowLeft size={18} className="button-icon" />
            Volver a la página principal
          </Link>
        </div>
      </div>

      <style jsx>{`
        .not-found-page {
          padding: var(--spacing-16) 0;
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .not-found-content {
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
        }
        
        .not-found-code {
          font-size: 6rem;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1;
          margin-bottom: var(--spacing-4);
        }
        
        .not-found-title {
          font-size: 2rem;
          margin-bottom: var(--spacing-4);
          color: var(--color-text-primary);
        }
        
        .not-found-message {
          margin-bottom: var(--spacing-8);
          color: var(--color-text-secondary);
        }
        
        .not-found-button {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-3) var(--spacing-6);
          background-color: var(--color-primary);
          color: white;
          border-radius: var(--radius-md);
          font-weight: 600;
          transition: all var(--transition-normal) ease;
        }
        
        .not-found-button:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
        }
        
        .button-icon {
          transition: transform var(--transition-normal) ease;
        }
        
        .not-found-button:hover .button-icon {
          transform: translateX(-3px);
        }
      `}</style>
    </div>
  )
}

export default NotFoundPage
