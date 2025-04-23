"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Hero = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const autoPlayRef = useRef(null)
  const slideIntervalRef = useRef(null)

  // Set up autoplay
  useEffect(() => {
    autoPlayRef.current = nextSlide
    startSlideTimer()

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current)
      }
    }
  }, [])

  const startSlideTimer = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current)
    }

    slideIntervalRef.current = setInterval(() => {
      autoPlayRef.current()
    }, 5000)
  }

  const resetSlideTimer = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current)
    }
    startSlideTimer()
  }

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      resetSlideTimer()
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
      resetSlideTimer()
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true)
      setCurrentSlide(index)
      resetSlideTimer()
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  return (
    <section className="hero-section">
      <div className="hero-slider">
        <div className="hero-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="hero-slide">
              <div className="slide-image-container">
                <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="slide-image" />
              </div>
              <div className="slide-content">
                <div className="slide-text">
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-description">{slide.description}</p>
                  <Link to={slide.link} className="slide-button">
                    {slide.buttonText || "Explorar"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-control prev" onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>

        <button className="slider-control next" onClick={nextSlide} aria-label="Next slide">
          <ChevronRight size={24} />
        </button>

        <div className="slider-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          margin-bottom: var(--spacing-12);
        }
        
        .hero-slider {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
        }
        
        .hero-slides {
          display: flex;
          transition: transform 0.5s ease-in-out;
          height: 500px;
        }
        
        .hero-slide {
          position: relative;
          min-width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }
        
        .slide-image-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7);
        }
        
        .slide-content {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: var(--spacing-8);
          color: white;
        }
        
        .slide-text {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        
        .slide-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-4);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .slide-description {
          font-size: 1.125rem;
          margin-bottom: var(--spacing-6);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .slide-button {
          display: inline-block;
          padding: var(--spacing-3) var(--spacing-6);
          background-color: var(--color-primary);
          color: white;
          font-weight: 600;
          border-radius: var(--radius-md);
          transition: all var(--transition-normal) ease;
        }
        
        .slide-button:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
        }
        
        .slider-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.8);
          color: var(--color-gray-900);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          transition: all var(--transition-normal) ease;
        }
        
        .slider-control:hover {
          background-color: white;
          transform: translateY(-50%) scale(1.1);
        }
        
        .slider-control.prev {
          left: var(--spacing-4);
        }
        
        .slider-control.next {
          right: var(--spacing-4);
        }
        
        .slider-indicators {
          position: absolute;
          bottom: var(--spacing-4);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: var(--spacing-2);
          z-index: 10;
        }
        
        .slider-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .slider-indicator.active {
          background-color: white;
          transform: scale(1.3);
        }
        
        @media (max-width: 768px) {
          .hero-slides {
            height: 400px;
          }
          
          .slide-title {
            font-size: 1.75rem;
          }
          
          .slide-description {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
