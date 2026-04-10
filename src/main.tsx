import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import HomeTemplate from "./templates/HomeTemplate";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Carts from "./pages/Carts";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Search from "./pages/Search";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="carts" element={<Carts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);