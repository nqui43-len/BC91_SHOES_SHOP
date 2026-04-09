import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import StoreLocation from "../components/StoreLocation";

export interface ProductModel {
  id: number;
  name: string;
  price: number;
  image: string;
  shortDescription: string;
}

const Home = () => {
  const [arrProduct, setArrProduct] = useState<ProductModel[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = arrProduct.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(arrProduct.length / itemsPerPage);
  // Hàm lùi 1 trang (Prev)
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Hàm tiến 1 trang (Next)
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getAllProduct = async () => {
    try {
      const res = await axios.get("https://shop.cyberlearn.vn/api/Product");
      setArrProduct(res.data.content);
    } catch (err) {
      console.log("Lỗi rồi em ơi:", err);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="container mt-4">
      {/* 1. CAROUSEL BOOTSTRAP */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide mb-5 custom-carousel"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        {/* ĐÂY LÀ 3 DẤU CHẤM TRÒN */}
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
              <div className="row align-items-center" style={{ padding: '30px 100px' }}>
                <div className="col-7">
                  <img
                    src={item.image}
                    className="img-fluid mx-auto d-block"
                    alt={item.name}
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
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

      {/* 2. TIÊU ĐỀ GRADIENT THEO FIGMA */}
      <h2 className="product-feature-title">Product Feature</h2>

      {/* 3. DANH SÁCH SẢN PHẨM */}
      <div className="row">
        {currentItems.map((item) => (
          <div className="col-4 mb-4" key={item.id}>
            <div className="product-card">
              <div className="product-img-box">
                <img src={item.image} alt={item.name} className="img-fluid" />
                <i className="fa-regular fa-heart heart-icon"></i>
              </div>
              <div className="product-info">
                <h5 className="product-name">{item.name}</h5>
                <p className="product-desc">{item.shortDescription}</p>
              </div>
              <div className="product-action">
                <NavLink to={`/detail/${item.id}`} className="btn-buy-now">
                  Buy now
                </NavLink>
                <div className="btn-price">{item.price.toLocaleString()} $</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. THANH PHÂN TRANG (PAGINATION) */}
      {totalPages > 1 && (
        <nav aria-label="Page navigation" className="mt-5 mb-5">
          <ul className="pagination justify-content-center custom-pagination">
            {/* NÚT PREV (Mũi tên trái) */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={goToPrevPage}>
                <i className="fa-solid fa-angle-left"></i>
              </button>
            </li>

            {/* CÁC NÚT SỐ (1, 2, 3...) */}
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

            {/* NÚT NEXT (Mũi tên phải) */}
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
