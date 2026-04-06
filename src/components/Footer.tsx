import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-5">
      <div className="bg-white pt-5 pb-4 footer-top-section footer-column-spacing">
        <div className="container">
          <div className="row">
            <div className="col-4 footer-column-divider">
              <h5 className="fw-bold mb-3">GET HELP</h5>
              <ul className="list-unstyled d-flex flex-column gap-2">
                <li>
                  <NavLink to="/" className="footer-link">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="footer-link">
                    Nike
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="footer-link">
                    Adidas
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="footer-link">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="col-4 footer-column-divider footer-column-spacing">
              <h5 className="fw-bold mb-3">SUPPORT</h5>
              <ul className="list-unstyled d-flex flex-column gap-2">
                <li>
                  <NavLink to="#" className="footer-link">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="footer-link">
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="footer-link">
                    Help
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="footer-link">
                    Phone
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="col-4 footer-column-spacing">
              <h5 className="fw-bold mb-3">REGISTER</h5>
              <ul className="list-unstyled d-flex flex-column gap-2">
                <li>
                  <NavLink to="/register" className="footer-link">
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="footer-link">
                    Login
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3" style={{ backgroundColor: "#D9D9D9" }}>
        <div className="container text-center">
          <p className="footer-copyright">
            © 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
