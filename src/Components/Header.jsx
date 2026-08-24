import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  TentTree,
  Phone,
} from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim().toLowerCase();

    if (!value) return;

    if (value.includes("about")) {
      navigate("/about");
    } else if (
      value.includes("contact") ||
      value.includes("phone") ||
      value.includes("booking")
    ) {
      navigate("/contact");
    } else {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("services")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }

    setSearch("");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="container nav-container">

        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <div className="logo-icon">
            <TentTree size={30} />
          </div>

          <div>
            <span className="logo-main">REAL</span>
            <span className="logo-sub">TENT HOUSE</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <a href="/#services" onClick={closeMenu}>
            Services
          </a>

          <Link to="/about" onClick={closeMenu}>
            About Us
          </Link>

          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </nav>

        {/* Search */}
        <form className="search-box" onSubmit={handleSearch}>
          <Search size={18} />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>

        {/* Call Button */}
        <a href="tel:+919999999999" className="call-button">
          <Phone size={18} />
          <span>Call Now</span>
        </a>

        {/* Mobile menu */}
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

export default Header;