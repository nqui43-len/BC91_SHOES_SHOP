import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import FloatingTools from "../components/FloatingTools";

const HomeTemplate = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingTools />
    </>
  );
};

export default HomeTemplate;
