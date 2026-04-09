import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from 'react-redux';
import { store } from './store/store';
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Carts from "./pages/Carts";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main
        className="container"
        style={{ minHeight: "80vh", marginTop: "20px" }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="carts" element={<Carts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
