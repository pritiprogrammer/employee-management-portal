import "./Footer.scss";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">EmployeeOps</span>
          <span className="footer-description">
            Employee operations management dashboard
          </span>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#support">Support</a>
        </nav>

        <div className="footer-copyright">
          © 2026 EmployeeOps
        </div>
      </div>
    </footer>
  );
}

export default Footer;