import { Link } from "react-router-dom";
import {
  
  
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-grid">

        <div className="footer-brand">
          <div className="footer-logo">
            <span>REAL</span> TENT HOUSE
          </div>

          <p>
            Creating beautiful celebrations with professional tent,
            catering, decoration and event services.
          </p>

          <div className="social-icons">
            {/* <a href="#" aria-label="Facebook">
              <Facebook size={19} />
            </a> */}

            {/* <a href="#" aria-label="Instagram" >
              <Instagram size={19} />
            </a> */}

            {/* <a href="#" aria-label="YouTube">
              <Youtube size={19} />
            </a> */}
          </div>
        </div>

        <div>
          <h3>Quick Links</h3>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>

        <div>
          <h3>Our Services</h3>

          <div className="footer-links">
            <a href="/#services">Tent House</a>
            <a href="/#services">Catering</a>
            <a href="/#services">Decoration</a>
            <a href="/#services">Lighting</a>
          </div>
        </div>

        <div>
          <h3>Contact</h3>

          <div className="footer-contact">
            <p>
              <Phone size={17} />
              +91 99999 99999
            </p>

            <p>
              <Mail size={17} />
              info@realtenthouse.com
            </p>

            <p>
              <MapPin size={17} />
              Uttar Pradesh, India
            </p>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>
            © {new Date().getFullYear()} Real Tent House. All Rights Reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;