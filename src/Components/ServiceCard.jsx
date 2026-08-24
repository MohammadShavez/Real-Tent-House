import { motion } from "framer-motion";

function ServiceCard({ icon, title, description }) {
  return (
    <motion.div
      className="service-card"
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <div className="service-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <a href="/contact">
        Get Service →
      </a>
    </motion.div>
  );
}

export default ServiceCard;