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
    // 1. Xóa sạch két sắt
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    // 2. Xóa sạch mây Redux
    dispatch(logoutAction());
  };
  const renderLoginUI = () => {
    if (userEmail) {
      // Nếu có email (hoangqui@cybersoft.com), cắt lấy phần đầu ("hoangqui") làm tên
      const nameDisplay = userEmail.split("@")[0];
      // Cắt lấy chữ cái đầu tiên ("h") và viết hoa lên ("H") làm Avatar
      const firstLetter = nameDisplay.charAt(0).toUpperCase();

      return (
        <div className="d-flex align-items-center gap-3">
          {/* Hình tròn Avatar */}
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

          {/* Tên hiển thị */}
          <span className="text-white">Hi, {nameDisplay}</span>

          {/* Nút Đăng xuất */}
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

    // Nếu chưa đăng nhập thì hiện như cũ
    return (
      <>
        <NavLink to="/login" className="text-white text-decoration-none me-3">
          Login
        </NavLink>
        <NavLink to="/register" className="text-white text-decoration-none">
          Register
        </NavLink>
      </>
    );
  };
  return (
    <header>
      <div className="bg-dark text-white py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <NavLink
            to="/"
            className="text-white text-decoration-none d-flex align-items-center"
          >
            <img
              src={logoCyber}
              alt="CyberLearn Logo"
              style={{ width: "116px", height: "32px" }}
            />
          </NavLink>

          <div className="d-flex align-items-center gap-4">
            <div
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-search me-2"></i>
              Search
            </div>

            <NavLink
              to="/carts"
              className="text-white text-decoration-none me-3"
            >
              <i className="fa-solid fa-cart-shopping"></i> ({totalQuantity})
            </NavLink>
            {/* HIỂN THỊ UI ĐĂNG NHẬP HOẶC AVATAR Ở ĐÂY */}
            {renderLoginUI()}
          </div>
        </div>
      </div>

      <div className="bg-white py-3 shadow-sm">
        <div className="container">
          <nav className="d-flex gap-4 fw-semibold fs-5">
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
