"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Users } from "lucide-react"
import "./events.css";

const Events = () => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Próximos eventos y concursos</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubre nuestros eventos, presentaciones de libros, firmas con autores y concursos. ¡Únete a nuestra
          comunidad de lectores!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h2>

              <div className="flex items-center text-gray-600 mb-2">
                <Calendar size={18} className="mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>

              <div className="flex items-center text-gray-600 mb-2">
                <MapPin size={18} className="mr-2" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <Users size={18} className="mr-2" />
                <span>
                  {event.registeredAttendees} / {event.capacity} asistentes
                </span>
              </div>

              <p className="text-gray-700 mb-6">{event.description}</p>

              <div className="flex justify-between items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${(event.registeredAttendees / event.capacity) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-4 text-sm text-gray-600">
                  {event.capacity - event.registeredAttendees} plazas disponibles
                </span>
              </div>

              <button className="mt-6 w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
                Inscribirse
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary bg-opacity-10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">¿Quieres proponer un evento?</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Si eres autor, editor o simplemente tienes una idea para un evento relacionado con la literatura, nos
          encantaría escucharte. Completa nuestro formulario y nos pondremos en contacto contigo.
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">
          Proponer un evento
        </button>
      </div>
    </div>
  )
}

export default Events

