import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Jaunpur, Uttar Pradesh",
    message:
      "Real Tent House made our wedding arrangements beautiful. The decoration and catering service were excellent. Our guests really enjoyed the event.",
    photo:
      "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Singh",
    location: "Varanasi, Uttar Pradesh",
    message:
      "Very professional team and beautiful decoration. Everything was arranged on time and the food was also excellent. Highly recommended.",
    photo:
      "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Verma",
    location: "Lucknow, Uttar Pradesh",
    message:
      "We booked Real Tent House for a family function and were very happy with their service. The team was cooperative and the setup looked amazing.",
    photo:
      "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 5,
  },
];

function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);

    return () => clearInterval(timer);
  }, []);

  const testimonial = testimonials[current];

  return (
    <section className="testimonial-section">

      <div className="container">

        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>CUSTOMER SATISFACTION</span>

          <h2>What Our Customers Say</h2>

          <p>
            Your happiness is our biggest achievement.
          </p>
        </motion.div>

        <div className="testimonial-wrapper">

          <button
            className="testimonial-arrow testimonial-prev"
            onClick={previous}
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>

          <AnimatePresence mode="wait">

            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              initial={{
                opacity: 0,
                x: 80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -80,
              }}
              transition={{
                duration: 0.5,
              }}
            >

              <div className="quote-icon">
                <Quote />
              </div>

              <div className="customer-photo-wrapper">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="customer-photo"
                />
              </div>

              <div className="customer-rating">
                {[...Array(testimonial.rating)].map(
                  (_, index) => (
                    <Star
                      key={index}
                      size={18}
                      fill="currentColor"
                    />
                  )
                )}
              </div>

              <p className="testimonial-message">
                "{testimonial.message}"
              </p>

              <h3>{testimonial.name}</h3>

              <span className="customer-location">
                {testimonial.location}
              </span>

            </motion.div>

          </AnimatePresence>

          <button
            className="testimonial-arrow testimonial-next"
            onClick={next}
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>

        </div>

        <div className="testimonial-dots">

          {testimonials.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrent(index)}
              className={
                index === current
                  ? "testimonial-dot active"
                  : "testimonial-dot"
              }
              aria-label={`Testimonial ${index + 1}`}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default TestimonialSlider;