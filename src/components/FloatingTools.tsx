import { useState, useEffect } from "react";

const FloatingTools = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      className="position-fixed bottom-0 end-0 m-4 d-flex flex-column gap-3"
      style={{ zIndex: 1050 }}
    >
      <button
        onClick={toggleTheme}
        className={`btn rounded-circle shadow d-flex justify-content-center align-items-center ${
          isDarkMode ? "btn-light text-dark" : "btn-dark text-white"
        }`}
        style={{ width: "48px", height: "48px", transition: "all 0.3s" }}
        title={isDarkMode ? "Chuyển sang nền Sáng" : "Chuyển sang nền Tối"}
      >
        <i className={`fa-solid ${isDarkMode ? "fa-sun" : "fa-moon"} fs-5`}></i>
      </button>

      <button
        onClick={scrollToTop}
        className={`btn btn-primary rounded-circle shadow d-flex justify-content-center align-items-center ${
          showTopBtn ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "48px",
          height: "48px",
          transition: "all 0.3s",
          pointerEvents: showTopBtn ? "auto" : "none",
          backgroundColor: "#6200EE",
          borderColor: "#6200EE",
        }}
        title="Lên đầu trang"
      >
        <i className="fa-solid fa-arrow-up fs-5"></i>
      </button>
    </div>
  );
};

export default FloatingTools;
