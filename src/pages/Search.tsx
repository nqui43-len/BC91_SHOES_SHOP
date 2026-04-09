import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import _ from "lodash";

export interface ProductModel {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  image: string;
}

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    try {
      const res = await axios.get(
        `https://shop.cyberlearn.vn/api/Product?keyword=${keyword}`,
      );
      setProducts(res.data.content);
    } catch (err) {
      // Bỏ qua log
    }
  };

  const toggleLike = async (productId: number) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Vui lòng đăng nhập để sử dụng tính năng Yêu thích!");
      navigate("/login");
      return;
    }

    const isAlreadyLiked = likedProducts.includes(productId);

    try {
      if (isAlreadyLiked) {
        await axios.get(
          `https://shop.cyberlearn.vn/api/Users/unlike?productId=${productId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setLikedProducts(likedProducts.filter((id) => id !== productId));
      } else {
        await axios.get(
          `https://shop.cyberlearn.vn/api/Users/like?productId=${productId}`,
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

  const sortedProducts = sortOrder
    ? _.orderBy(products, ["price"], [sortOrder])
    : products;

  return (
    <div className="container my-5" style={{ minHeight: "60vh" }}>
      <div className="mb-5">
        <label className="form-label fw-bold">Search</label>
        <div className="d-flex gap-3" style={{ maxWidth: "400px" }}>
          <input
            type="text"
            className="form-control bg-light border-0"
            placeholder="product name ...."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="btn btn-submit-purple px-4"
            style={{ borderRadius: "50px" }}
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>
      </div>

      <div
        className="profile-header-gradient mb-4 w-100"
        style={{ maxWidth: "100%" }}
      >
        Search result
      </div>

      <div className="mb-5" style={{ maxWidth: "300px" }}>
        <label className="form-label fw-bold text-secondary">Price</label>
        <select
          className="form-select bg-light border-0"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="">-- Chọn kiểu sắp xếp --</option>
          <option value="desc">decrease (Giảm dần)</option>
          <option value="asc">ascending (Tăng dần)</option>
        </select>
      </div>

      <div className="row">
        {products.length === 0 ? (
          <div className="col-12 text-center text-secondary py-5">
            <h5>Hãy nhập tên giày bạn muốn tìm nhé!</h5>
          </div>
        ) : (
          sortedProducts.map((item) => (
            <div className="col-4 mb-4" key={item.id}>
              <div className="product-card">
                <div className="product-img-box">
                  <img src={item.image} alt={item.name} className="img-fluid" />
                  <i
                    className={`${likedProducts.includes(item.id) ? "fa-solid text-danger" : "fa-regular text-dark"} fa-heart heart-icon`}
                    style={{ cursor: "pointer", transition: "transform 0.2s" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    onClick={() => toggleLike(item.id)}
                    title={
                      likedProducts.includes(item.id)
                        ? "Bỏ yêu thích"
                        : "Thêm vào yêu thích"
                    }
                  ></i>
                </div>
                <div className="product-info">
                  <h5 className="product-name">{item.name}</h5>
                  <p className="product-desc">{item.shortDescription}</p>
                </div>
                <div className="product-action">
                  <NavLink to={`/detail/${item.id}`} className="btn-buy-now">
                    Buy now
                  </NavLink>
                  <div className="btn-price">
                    {item.price.toLocaleString()} $
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
