import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Make Your Celebration Memorable",
    subtitle:
      "Premium tent house, catering and event decoration services for every special occasion.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 2,
    title: "Beautiful Weddings & Events",
    subtitle:
      "Elegant decoration, lighting and complete event setup designed around your celebration.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 3,
    title: "Professional Catering",
    subtitle:
      "Delicious food and professional service to make your guests feel special.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2000&q=85",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="hero">

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="hero-slide"
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-overlay"></div>

          <div className="container hero-content">

            <motion.div
              key={`text-${slide.id}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-text"
            >
              <span className="hero-tag">
                REAL TENT HOUSE
              </span>

              <h1>{slide.title}</h1>

              <p>{slide.subtitle}</p>

              <div className="hero-buttons">
                <Link to="/contact" className="primary-button">
                  Book Your Event
                  <ArrowRight size={19} />
                </Link>

                <a href="#services" className="secondary-button">
                  Explore Services
                </a>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Controls */}

      <button
        className="slider-button slider-left"
        onClick={previousSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>

      <button
        className="slider-button slider-right"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>

      {/* Dots */}

      <div className="slider-dots">
        {slides.map((item, index) => (
          <button
            key={item.id}
            className={index === current ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}

export default HeroSlider;