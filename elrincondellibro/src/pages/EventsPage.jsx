"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Users } from "lucide-react"

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulación de carga de eventos
    const loadEvents = async () => {
      // En un caso real, esto sería una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 800))

      setEvents([
        {
          id: 1,
          title: "Firma de libros: Carlos Ruiz Zafón",
          date: "2025-04-15T18:00:00",
          location: "Tienda principal, Barcelona",
          description:
            "El reconocido autor estará firmando ejemplares de su última novela. Aforo limitado, se requiere inscripción previa.",
          image: "/placeholder.svg?height=300&width=500",
          capacity: 50,
          registeredAttendees: 32,
        },
        {
          id: 2,
          title: "Club de lectura: Ciencia Ficción",
          date: "2025-04-20T19:00:00",
          location: "Sala de eventos, Madrid",
          description:
            'Discusión sobre "Proyecto Hail Mary" de Andy Weir. Abierto a todos los amantes de la ciencia ficción.',
          image: "/placeholder.svg?height=300&width=500",
          capacity: 25,
          registeredAttendees: 18,
        },
        {
          id: 3,
          title: "Taller de escritura creativa",
          date: "2025-05-05T17:30:00",
          location: "Online (Zoom)",
          description:
            "Aprende técnicas de escritura creativa con la escritora Ana García. Ideal para principiantes y nivel intermedio.",
          image: "/placeholder.svg?height=300&width=500",
          capacity: 100,
          registeredAttendees: 45,
        },
        {
          id: 4,
          title: "Presentación: Novedades manga primavera 2025",
          date: "2025-04-28T18:30:00",
          location: "Tienda principal, Barcelona",
          description:
            "Descubre las nuevas series y volúmenes de manga que llegarán esta primavera. Con sorteos y regalos para los asistentes.",
          image: "/placeholder.svg?height=300&width=500",
          capacity: 75,
          registeredAttendees: 60,
        },
      ])

      setLoading(false)
    }

    loadEvents()
  }, [])

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  return (
    <div className="events-page">
      <div className="container">
        <div className="page-header text-center">
          <h1 className="page-title">Próximos eventos y concursos</h1>
          <p className="page-description">
            Descubre nuestros eventos, presentaciones de libros, firmas con autores y concursos. ¡Únete a nuestra
            comunidad de lectores!
          </p>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-image-container">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="event-image" />
                </div>
                <div className="event-content">
                  <h2 className="event-title">{event.title}</h2>

                  <div className="event-details">
                    <div className="event-detail">
                      <Calendar size={18} className="event-icon" />
                      <span>{formatDate(event.date)}</span>
                    </div>

                    <div className="event-detail">
                      <MapPin size={18} className="event-icon" />
                      <span>{event.location}</span>
                    </div>

                    <div className="event-detail">
                      <Users size={18} className="event-icon" />
                      <span>
                        {event.registeredAttendees} / {event.capacity} asistentes
                      </span>
                    </div>
                  </div>

                  <p className="event-description">{event.description}</p>

                  <div className="event-capacity">
                    <div className="capacity-bar-container">
                      <div
                        className="capacity-bar"
                        style={{ width: `${(event.registeredAttendees / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <span className="capacity-text">
                      {event.capacity - event.registeredAttendees} plazas disponibles
                    </span>
                  </div>

                  <button className="event-button">Inscribirse</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="propose-event-section">
          <h2 className="propose-title">¿Quieres proponer un evento?</h2>
          <p className="propose-description">
            Si eres autor, editor o simplemente tienes una idea para un evento relacionado con la literatura, nos
            encantaría escucharte. Completa nuestro formulario y nos pondremos en contacto contigo.
          </p>
          <button className="propose-button">Proponer un evento</button>
        </div>
      </div>

      <style jsx>{`
        .events-page {
          padding-bottom: var(--spacing-16);
        }
        
        .page-header {
          margin-bottom: var(--spacing-12);
        }
        
        .page-title {
          font-size: 2rem;
          position: relative;
          padding-bottom: var(--spacing-4);
          display: inline-block;
        }
        
        .page-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background-color: var(--color-primary);
        }
        
        .page-description {
          max-width: 800px;
          margin: 0 auto;
          color: var(--color-text-secondary);
        }
        
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
        }
        
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
        
        .events-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-8);
          margin-bottom: var(--spacing-16);
        }
        
        @media (min-width: 768px) {
          .events-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .event-card {
          background-color: white;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: transform var(--transition-normal) ease, box-shadow var(--transition-normal) ease;
        }
        
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        .event-image-container {
          height: 200px;
          overflow: hidden;
        }
        
        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-normal) ease;
        }
        
        .event-card:hover .event-image {
          transform: scale(1.05);
        }
        
        .event-content {
          padding: var(--spacing-6);
        }
        
        .event-title {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-4);
          color: var(--color-primary);
        }
        
        .event-details {
          margin-bottom: var(--spacing-4);
        }
        
        .event-detail {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-2);
          color: var(--color-text-secondary);
        }
        
        .event-icon {
          margin-right: var(--spacing-2);
          color: var(--color-primary);
        }
        
        .event-description {
          margin-bottom: var(--spacing-4);
          color: var(--color-text-primary);
          line-height: 1.6;
        }
        
        .event-capacity {
          margin-bottom: var(--spacing-4);
        }
        
        .capacity-bar-container {
          height: 8px;
          background-color: var(--color-gray-200);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: var(--spacing-2);
        }
        
        .capacity-bar {
          height: 100%;
          background-color: var(--color-primary);
          border-radius: var(--radius-full);
        }
        
        .capacity-text {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }
        
        .event-button {
          width: 100%;
          padding: var(--spacing-3) var(--spacing-4);
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: background-color var(--transition-normal) ease;
        }
        
        .event-button:hover {
          background-color: var(--color-primary-dark);
        }
        
        .propose-event-section {
          background-color: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
          padding: var(--spacing-8);
          text-align: center;
        }
        
        .propose-title {
          font-size: 1.75rem;
          color: var(--color-primary);
          margin-bottom: var(--spacing-4);
        }
        
        .propose-description {
          max-width: 800px;
          margin: 0 auto var(--spacing-6);
          color: var(--color-text-secondary);
        }
        
        .propose-button {
          padding: var(--spacing-3) var(--spacing-6);
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .propose-button:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  )
}

export default EventsPage

