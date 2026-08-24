import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setSubmitted(false);
  };

  // =========================
  // HANDLE FORM SUBMIT
  // =========================
 const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");
  setSubmitted(false);
  setResponseData(null);

  try {
    // ==========================================
    // GET CLEAN FORM DATA
    // ==========================================

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const eventType = formData.eventType;
    const message = formData.message.trim();

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!name) {
      throw new Error(
        "Please enter your name."
      );
    }

    if (!phone) {
      throw new Error(
        "Please enter your phone number."
      );
    }

    if (!/^\d{10}$/.test(phone)) {
      throw new Error(
        "Please enter a valid 10-digit phone number."
      );
    }

    if (!email) {
      throw new Error(
        "Please enter your email address."
      );
    }

    if (!eventType) {
      throw new Error(
        "Please select an event type."
      );
    }

    if (!message) {
      throw new Error(
        "Please enter your message."
      );
    }

    console.log(
      "Submitting enquiry:",
      {
        name,
        phone,
        email,
        eventType,
        message,
      }
    );

    // ==========================================
    // STEP 1
    // SAVE ENQUIRY TO SUPABASE
    // ==========================================

    const {
      data,
      error: supabaseError,
    } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          phone,
          email,
          event_type: eventType,
          message,
        },
      ]);
      // .select();

    // ==========================================
    // CHECK DATABASE ERROR
    // ==========================================

    if (supabaseError) {
      console.error(
        "Supabase Error:",
        supabaseError
      );

      throw new Error(
        supabaseError.message ||
          "Failed to submit enquiry."
      );
    }

    console.log(
      "Enquiry saved successfully:",
      data
    );

    // ==========================================
    // STEP 2
    // SEND CUSTOMER EMAIL
    // ==========================================

    const {
      data: emailData,
      error: emailError,
    } = await supabase.functions.invoke(
      "send-contact-email",
      {
        body: {
          name,
          phone,
          email,
          eventType,
          message,
        },
      }
    );

    // ==========================================
    // CHECK EMAIL ERROR
    // ==========================================

    if (emailError) {
      console.error(
        "Email Function Error:",
        emailError
      );

      // Database succeeded,
      // email failed.
      setSubmitted(true);

      setError(
        "Your enquiry was submitted successfully, but the confirmation email could not be sent."
      );
    } else {
      console.log(
        "Customer email sent successfully:",
        emailData
      );

      setSubmitted(true);
    }

    // ==========================================
    // SAVE RESPONSE
    // ==========================================

    setResponseData(data);

    // ==========================================
    // CLEAR FORM
    // ==========================================

    setFormData({
      name: "",
      phone: "",
      email: "",
      eventType: "",
      message: "",
    });

  } catch (err) {
    console.error(
      "Contact form error:",
      err
    );

    setError(
      err.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* =========================
          PAGE HERO
      ========================== */}
      <section className="page-hero contact-hero">
        <div className="page-hero-overlay"></div>

        <div className="container page-hero-content">
          <span>GET IN TOUCH</span>

          <h1>Contact Us</h1>

          <p>
            Tell us about your event and let us help
            you plan it.
          </p>
        </div>
      </section>

      {/* =========================
          CONTACT SECTION
      ========================== */}
      <section className="section">
        <div className="container contact-grid">

          {/* =====================
              CONTACT INFORMATION
          ====================== */}
          <motion.div
            className="contact-info"
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <span className="section-label">
              CONTACT DETAILS
            </span>

            <h2>Let's Plan Your Event</h2>

            <p>
              Contact Real Tent House for bookings,
              pricing and event service information.
            </p>

            <div className="contact-items">

              {/* PHONE */}
              <a
                href="tel:+919999999999"
                className="contact-item"
              >
                <div>
                  <Phone />
                </div>

                <section>
                  <strong>Phone</strong>

                  <span>
                    +91 99999 99999
                  </span>
                </section>
              </a>

              {/* EMAIL */}
              <a
                href="mailto:info@realtenthouse.com"
                className="contact-item"
              >
                <div>
                  <Mail />
                </div>

                <section>
                  <strong>Email</strong>

                  <span>
                    info@realtenthouse.com
                  </span>
                </section>
              </a>

              {/* LOCATION */}
              <div className="contact-item">
                <div>
                  <MapPin />
                </div>

                <section>
                  <strong>Location</strong>

                  <span>
                    Uttar Pradesh, India
                  </span>
                </section>
              </div>

              {/* WORKING HOURS */}
              <div className="contact-item">
                <div>
                  <Clock />
                </div>

                <section>
                  <strong>Working Hours</strong>

                  <span>
                    9:00 AM – 9:00 PM
                  </span>
                </section>
              </div>

            </div>
          </motion.div>

          {/* =====================
              CONTACT FORM
          ====================== */}
          <motion.div
            className="contact-form-container"
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <h2>Send Us A Message</h2>

              {/* SUCCESS MESSAGE */}
              {submitted && (
                <div className="success-message">
                  <CheckCircle size={20} />

                  <div>
                    <strong>
                      Thank you!
                    </strong>

                    <p>
                      Your enquiry has been
                      received successfully.
                      {formData.email && (
                        <>
                          {" "}
                          A confirmation email has
                          also been sent.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* ERROR MESSAGE */}
              {error && (
                <div className="error-message">
                  <AlertCircle size={20} />

                  <div>
                    <strong>
                      Notice
                    </strong>

                    <p>{error}</p>
                  </div>
                </div>
              )}

              {/* NAME + PHONE */}
              <div className="form-row">

                {/* NAME */}
                <div className="form-group">
                  <label htmlFor="name">
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* PHONE */}
                <div className="form-group">
                  <label htmlFor="phone">
                    Phone
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    minLength={10}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EVENT TYPE */}
              <div className="form-group">
                <label htmlFor="eventType">
                  Event Type
                </label>

                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select event type
                  </option>

                  <option value="Wedding">
                    Wedding
                  </option>

                  <option value="Birthday">
                    Birthday
                  </option>

                  <option value="Reception">
                    Reception
                  </option>

                  <option value="Corporate">
                    Corporate Event
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* MESSAGE */}
              <div className="form-group">
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell us about your event..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="primary-button form-button"
                disabled={loading}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Enquiry
                    <Send size={18} />
                  </>
                )}
              </button>

            </form>
          </motion.div>

        </div>
      </section>

      {/* =========================
          GOOGLE MAP
      ========================== */}
      <section className="map-section">
        <iframe
          title="Real Tent House Location"
          src="https://www.google.com/maps?q=Uttar%20Pradesh%20India&output=embed"
          loading="lazy"
          style={{
            width: "100%",
            height: "450px",
            border: 0,
          }}
        ></iframe>
      </section>
    </>
  );
}

export default Contact;