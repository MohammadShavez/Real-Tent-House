import { motion } from "framer-motion";
import  TestimonialSlider  from "../Components/TestimonialSlider";


import {
  Tent,
  Utensils,
  Lightbulb,
  Armchair,
  Flower2,
  PartyPopper,
  CheckCircle2,
  Star,
} from "lucide-react";

import HeroSlider from "../Components/HeroSlider";
import ServiceCard from "../Components/ServiceCard";

function Home() {
  return (
    <>

      {/* Hero */}

      <HeroSlider />

      {/* Services */}

      <section className="section services-section" id="services">

        <div className="container">

          <motion.div
            className="section-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span>WHAT WE DO</span>
            <h2>Our Event Services</h2>

            <p>
              Everything you need to create a beautiful and memorable
              celebration.
            </p>
          </motion.div>

          <div className="services-grid">

            <ServiceCard
              icon={<Tent />}
              title="Tent House"
              description="Premium tents and complete event setup for weddings, parties and functions."
            />

            <ServiceCard
              icon={<Utensils />}
              title="Catering"
              description="Delicious food menus with professional catering service for your guests."
            />

            <ServiceCard
              icon={<Flower2 />}
              title="Decoration"
              description="Beautiful floral and theme-based decorations customized for your event."
            />

            <ServiceCard
              icon={<Lightbulb />}
              title="Lighting"
              description="Elegant decorative lighting to give your venue a stunning appearance."
            />

            <ServiceCard
              icon={<Armchair />}
              title="Furniture"
              description="Chairs, tables, sofas and other furniture for comfortable event arrangements."
            />

            <ServiceCard
              icon={<PartyPopper />}
              title="Complete Event Setup"
              description="Complete event management and setup from beginning to end."
            />

          </div>

        </div>

      </section>

      {/* About Preview */}

      <section className="about-preview">

        <div className="container about-preview-grid">

          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=80"
              alt="Event decoration"
            />
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <span className="section-label">
              ABOUT REAL TENT HOUSE
            </span>

            <h2>
              We Turn Your Special Moments Into Beautiful Memories
            </h2>

            <p>
              Real Tent House provides professional event services
              including tent setup, catering, decoration, lighting and
              furniture arrangements.
            </p>

            <p>
              Whether you are planning a wedding, birthday party,
              reception, corporate event or family function, our team
              works to make your event comfortable and memorable.
            </p>

            <div className="check-list">

              <div>
                <CheckCircle2 />
                <span>Professional Event Setup</span>
              </div>

              <div>
                <CheckCircle2 />
                <span>Quality Decoration & Equipment</span>
              </div>

              <div>
                <CheckCircle2 />
                <span>Affordable Packages</span>
              </div>

              <div>
                <CheckCircle2 />
                <span>Customer-Focused Service</span>
              </div>

            </div>

            <a href="/about" className="primary-button">
              Learn More
            </a>

          </motion.div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="section why-section">

        <div className="container">

          <div className="section-heading">
            <span>WHY CHOOSE US</span>
            <h2>Make Your Event Special With Us</h2>
          </div>

          <div className="why-grid">

            <motion.div
              className="why-card"
              whileHover={{ scale: 1.04 }}
            >
              <Star />
              <h3>Quality Service</h3>
              <p>
                We focus on quality equipment, presentation and
                professional service.
              </p>
            </motion.div>

            <motion.div
              className="why-card"
              whileHover={{ scale: 1.04 }}
            >
              <CheckCircle2 />
              <h3>Reliable Team</h3>
              <p>
                Our team helps coordinate the complete event setup.
              </p>
            </motion.div>

            <motion.div
              className="why-card"
              whileHover={{ scale: 1.04 }}
            >
              <PartyPopper />
              <h3>Memorable Events</h3>
              <p>
                We create beautiful environments for your special
                occasions.
              </p>
            </motion.div>

          </div>

        </div>

      </section>

      {/* Customer Testimonials */}

        <TestimonialSlider />

      {/* CTA */}

      <section className="cta-section">

        <div className="container cta-content">

          <h2>Planning Your Next Event?</h2>

          <p>
            Let Real Tent House help you create a celebration your
            guests will remember.
          </p>

          <a href="../contact" className="primary-button light-button">
            Contact Us
          </a>

        </div>

      </section>

    </>
  );
}

export default Home;