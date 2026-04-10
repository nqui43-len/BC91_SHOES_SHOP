import { NavLink } from "react-router-dom";
import logoCyber from "../assets/image 3.svg";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../store/userSlice";
import type { RootState } from "../store/store";

const Header = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.user.email);
  const cart = useSelector((state: RootState) => state.cart);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    dispatch(logoutAction());
  };

  const renderLoginUI = () => {
    if (userEmail) {
      const nameDisplay = userEmail.split("@")[0];
      const firstLetter = nameDisplay.charAt(0).toUpperCase();
      return (
        <div className="d-flex align-items-center gap-2 gap-md-3 mt-3 mt-md-0">
          <NavLink
            to="/profile"
            className="d-flex align-items-center gap-2 text-decoration-none"
            style={{ transition: "opacity 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <div
              className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold"
              style={{
                width: "35px",
                height: "35px",
                backgroundColor: "#6200EE",
              }}
            >
              {firstLetter}
            </div>
            <span className="text-white">Hi, {nameDisplay}</span>
          </NavLink>
          <span
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
            className="text-danger ms-2"
            title="Logout"
          >
            <i className="fa-solid fa-right-from-bracket fs-5"></i>
          </span>
        </div>
      );
    }
    return (
      <div className="d-flex gap-3 mt-3 mt-md-0">
        <NavLink to="/login" className="text-white text-decoration-none">
          Login
        </NavLink>
        <NavLink to="/register" className="text-white text-decoration-none">
          Register
        </NavLink>
      </div>
    );
  };

  return (
    <header>
      <div className="bg-dark text-white py-3">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <NavLink
            to="/"
            className="text-white text-decoration-none d-flex align-items-center mb-3 mb-md-0"
          >
            <img
              src={logoCyber}
              alt="CyberLearn Logo"
              style={{ width: "116px", height: "32px" }}
            />
          </NavLink>

          <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 gap-md-4">
            <NavLink
              to="/search"
              className="text-white text-decoration-none d-flex align-items-center"
            >
              <i className="fa fa-search me-2"></i> Search
            </NavLink>
            <NavLink to="/carts" className="text-white text-decoration-none">
              <i className="fa-solid fa-cart-shopping"></i> ({totalQuantity})
            </NavLink>
            {renderLoginUI()}
          </div>
        </div>
      </div>

      <div className="bg-white py-3 shadow-sm overflow-auto">
        <div className="container">
          <nav
            className="d-flex flex-nowrap gap-4 fw-semibold fs-5"
            style={{ whiteSpace: "nowrap" }}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "menu-link active-menu" : "menu-link"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/men"
              className={({ isActive }) =>
                isActive ? "menu-link active-menu" : "menu-link"
              }
            >
              Men
            </NavLink>
            <NavLink
              to="/woman"
              className={({ isActive }) =>
                isActive ? "menu-link active-menu" : "menu-link"
              }
            >
              Woman
            </NavLink>
            <NavLink
              to="/kid"
              className={({ isActive }) =>
                isActive ? "menu-link active-menu" : "menu-link"
              }
            >
              Kid
            </NavLink>
            <NavLink
              to="/sport"
              className={({ isActive }) =>
                isActive ? "menu-link active-menu" : "menu-link"
              }
            >
              Sport
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
