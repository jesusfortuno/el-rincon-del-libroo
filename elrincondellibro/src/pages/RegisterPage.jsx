"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../services/api"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    try {
      const result = await register(name, email, password)

      if (result.success) {
        // En un sistema real, aquí guardaríamos el token en localStorage
        // y configuraríamos el estado de autenticación
        navigate("/")
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Ha ocurrido un error. Por favor, inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="container">
        <div className="register-card">
          <h1 className="register-title">Crear cuenta</h1>

          {error && <div className="error-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
                minLength={6}
              />
              <p className="password-hint">La contraseña debe tener al menos 6 caracteres</p>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="register-button">
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <div className="login-link">
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="link">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .register-page {
          padding: var(--spacing-12) 0;
          min-height: 80vh;
          display: flex;
          align-items: center;
        }
        
        .register-card {
          max-width: 450px;
          margin: 0 auto;
          background-color: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          padding: var(--spacing-8);
        }
        
        .register-title {
          font-size: 1.75rem;
          text-align: center;
          margin-bottom: var(--spacing-6);
          color: var(--color-primary);
        }
        
        .error-alert {
          background-color: #fef2f2;
          color: #b91c1c;
          padding: var(--spacing-3) var(--spacing-4);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-4);
          border-left: 4px solid #ef4444;
        }
        
        .register-form {
          margin-bottom: var(--spacing-6);
        }
        
        .form-group {
          margin-bottom: var(--spacing-4);
        }
        
        .form-label {
          display: block;
          margin-bottom: var(--spacing-2);
          font-weight: 500;
          color: var(--color-text-secondary);
        }
        
        .form-control {
          width: 100%;
          padding: var(--spacing-3);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 1rem;
          transition: all var(--transition-normal) ease;
        }
        
        .form-control:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(140, 94, 88, 0.2);
        }
        
        .password-hint {
          font-size: 0.75rem;
          color: var(--color-text-tertiary);
          margin-top: var(--spacing-1);
        }
        
        .register-button {
          width: 100%;
          padding: var(--spacing-3);
          background-color: var(--color-primary);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-normal) ease;
          margin-top: var(--spacing-4);
        }
        
        .register-button:hover:not(:disabled) {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
        }
        
        .register-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .login-link {
          text-align: center;
          padding-top: var(--spacing-4);
          border-top: 1px solid var(--color-border-light);
          color: var(--color-text-secondary);
        }
        
        .link {
          color: var(--color-primary);
          font-weight: 600;
          transition: color var(--transition-normal) ease;
        }
        
        .link:hover {
          color: var(--color-primary-dark);
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

export default RegisterPage
