import { NavLink } from 'react-router-dom';
import logoCyber from '../assets/image 3.svg'

const Header = () => {
  return (
    <header>
      <div className="bg-dark text-white py-3">
        <div className="container d-flex justify-content-between align-items-center">
          
          <NavLink to="/" className="text-white text-decoration-none d-flex align-items-center">
            <img src={logoCyber} alt="CyberLearn Logo" style={{ width: '116px', height: '32px' }} />
          </NavLink>

          <div className="d-flex align-items-center gap-4">
            
            <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
              <i className="fa fa-search me-2"></i>
              Search
            </div>

            <NavLink to="/carts" className="text-white text-decoration-none d-flex align-items-center">
              🛒 (1)
            </NavLink>

            <div className="d-flex gap-3">
              <NavLink to="/login" className="top-link">Login</NavLink>
              <NavLink to="/register" className="top-link">Register</NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-3 shadow-sm">
        <div className="container">
          <nav className="d-flex gap-4 fw-semibold fs-5">
            <NavLink to="/" className={({ isActive }) => isActive ? "menu-link active-menu" : "menu-link"}>Home</NavLink>
            <NavLink to="/men" className={({ isActive }) => isActive ? "menu-link active-menu" : "menu-link"}>Men</NavLink>
            <NavLink to="/woman" className={({ isActive }) => isActive ? "menu-link active-menu" : "menu-link"}>Woman</NavLink>
            <NavLink to="/kid" className={({ isActive }) => isActive ? "menu-link active-menu" : "menu-link"}>Kid</NavLink>
            <NavLink to="/sport" className={({ isActive }) => isActive ? "menu-link active-menu" : "menu-link"}>Sport</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;