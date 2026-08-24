import { motion } from "framer-motion";
import {
  CheckCircle2,
  Users,
  Award,
  HeartHandshake,
} from "lucide-react";

function About() {
  return (
    <>

      <section className="page-hero">

        <div className="page-hero-overlay"></div>

        <div className="container page-hero-content">

          <span>REAL TENT HOUSE</span>

          <h1>About Us</h1>

          <p>
            Professional event services for your special moments.
          </p>

        </div>

      </section>

      <section className="section">

        <div className="container about-page-grid">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              className="about-page-image"
              src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=80"
              alt="Real Tent House event"
            />
          </motion.div>

          <motion.div
            className="about-page-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <span className="section-label">
              WHO WE ARE
            </span>

            <h2>
              Your Trusted Partner For Beautiful Celebrations
            </h2>

            <p>
              Real Tent House is an event service business focused on
              providing reliable tent house, catering, decoration,
              lighting and event setup services.
            </p>

            <p>
              We understand that every event is special. Our goal is to
              provide a comfortable, attractive and professionally
              organized environment for you and your guests.
            </p>

            <div className="check-list">

              <div>
                <CheckCircle2 />
                <span>Wedding & Reception Setup</span>
              </div>

              <div>
                <CheckCircle2 />
                <span>Birthday & Family Functions</span>
              </div>

              <div>
                <CheckCircle2 />
                <span>Corporate & Social Events</span>
              </div>

              <div>
                <CheckCircle2 />
                <span>Catering & Decoration</span>
              </div>

            </div>

          </motion.div>

        </div>

      </section>

      <section className="section values-section">

        <div className="container">

          <div className="section-heading">

            <span>OUR VALUES</span>

            <h2>What We Believe In</h2>

          </div>

          <div className="values-grid">

            <div className="value-card">
              <Users />
              <h3>Professionalism</h3>
              <p>
                We believe in organized and professional event service.
              </p>
            </div>

            <div className="value-card">
              <Award />
              <h3>Quality</h3>
              <p>
                We aim to provide quality products and beautiful
                presentation.
              </p>
            </div>

            <div className="value-card">
              <HeartHandshake />
              <h3>Trust</h3>
              <p>
                We build long-term relationships through dependable
                service.
              </p>
            </div>

          </div>

        </div>

      </section>

    </>
  );
}

export default About;