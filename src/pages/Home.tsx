import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import StoreLocation from "../components/StoreLocation";
import ProductCard, { type ProductModel } from "../components/ProductCard";

const Home = () => {
  const navigate = useNavigate();
  const [arrProduct, setArrProduct] = useState<ProductModel[]>([]);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = arrProduct.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(arrProduct.length / itemsPerPage);

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getInitialLikes = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const res = await axios.post(
          "https://shop.cyberlearn.vn/api/Users/getProfile",
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const favs = res.data.content.productsFavorite || [];
        // FIX: Ép kiểu dữ liệu về Number để chắc chắn không bị lệch pha
        setLikedProducts(favs.map((p: any) => Number(p.id)));
      } catch (err) {}
    }
  };

  const getAllProduct = async () => {
    try {
      const res = await axios.get("https://shop.cyberlearn.vn/api/Product");
      setArrProduct(res.data.content);
    } catch (err) {}
  };

  const toggleLike = async (productId: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Vui lòng đăng nhập để sử dụng tính năng Yêu thích!");
      navigate("/login");
      return;
    }

    const isAlreadyLiked = likedProducts.includes(productId);
    const timestamp = new Date().getTime();

    try {
      if (isAlreadyLiked) {
        await axios.get(
          `https://shop.cyberlearn.vn/api/Users/unlike?productId=${productId}&t=${timestamp}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setLikedProducts(likedProducts.filter((id) => id !== productId));
      } else {
        await axios.get(
          `https://shop.cyberlearn.vn/api/Users/like?productId=${productId}&t=${timestamp}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setLikedProducts([...likedProducts, productId]);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        alert("Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại!");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userEmail");
        navigate("/login");
      } else {
        const errorMsg = err.response?.data?.content || "Lỗi kết nối";
        if (errorMsg.includes("đã") || errorMsg.includes("already")) {
          setLikedProducts([...likedProducts, productId]);
        } else {
          alert("Thao tác thất bại: " + errorMsg);
        }
      }
    }
  };

  useEffect(() => {
    getAllProduct();
    getInitialLikes();
  }, []);

  return (
    <div className="container mt-4">
      <div
        id="carouselExampleIndicators"
        className="carousel slide mb-5 custom-carousel"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
          ></button>
        </div>
        <div className="carousel-inner">
          {arrProduct.slice(0, 3).map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div
                className="row align-items-center"
                style={{ padding: "30px 100px" }}
              >
                <div className="col-7">
                  <img
                    src={item.image}
                    className="img-fluid mx-auto d-block"
                    alt={item.name}
                    style={{ maxHeight: "400px", objectFit: "contain" }}
                  />
                </div>
                <div className="col-5">
                  <h1 className="fw-bold">{item.name}</h1>
                  <p className="text-secondary pe-4">{item.shortDescription}</p>
                  <NavLink
                    to={`/detail/${item.id}`}
                    className="btn btn-warning mt-3 px-4 py-2 fw-bold"
                    style={{ backgroundColor: "#E2B24E", border: "none" }}
                  >
                    Buy now
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <i className="fa-solid fa-caret-left custom-arrow"></i>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <i className="fa-solid fa-caret-right custom-arrow"></i>
        </button>
      </div>

      <h2 className="product-feature-title">Product Feature</h2>

      <div className="row">
        {currentItems.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            isLiked={likedProducts.includes(item.id)}
            onToggleLike={toggleLike}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Page navigation" className="mt-5 mb-5">
          <ul className="pagination justify-content-center custom-pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={goToPrevPage}>
                <i className="fa-solid fa-angle-left"></i>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <li
                  key={number}
                  className={`page-item ${currentPage === number ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ),
            )}
            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={goToNextPage}>
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      )}

      <StoreLocation />
    </div>
  );
};

export default Home;
