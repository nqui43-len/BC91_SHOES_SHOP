import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import ProductCard, { type ProductModel } from "../components/ProductCard";

export interface ProductDetailModel {
  id: number;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  size: string[];
  relatedProducts: ProductModel[];
}

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<ProductDetailModel | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const getProductDetail = async () => {
    try {
      const res = await axios.get(
        `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
      );
      setProduct(res.data.content);
    } catch (err) {}
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
        setLikedProducts(favs.map((p: any) => p.id));
      } catch (err) {}
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

  useEffect(() => {
    getProductDetail();
    getInitialLikes();
    setQuantity(1);
    setSelectedSize("");
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h3 className="text-secondary">Đang tải dữ liệu...</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row mb-5">
        <div className="col-12 col-md-4 d-flex justify-content-center align-items-center bg-light p-4 mb-4 mb-md-0">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: "350px", objectFit: "contain" }}
          />
        </div>

        <div className="col-12 col-md-8 px-md-5">
          <h2 className="fw-normal mb-3">{product.name}</h2>
          <p className="text-secondary">{product.description}</p>

          <h5 className="text-success mb-3">Available size</h5>
          <div className="d-flex flex-wrap gap-2 mb-4">
            {product.size.map((sz, index) => (
              <button
                key={index}
                className={`btn fw-bold rounded-0 px-3 ${selectedSize === sz ? "btn-dark" : "btn-outline-secondary"}`}
                onClick={() => setSelectedSize(sz)}
              >
                {sz}
              </button>
            ))}
          </div>

          <h3 className="fw-bold text-danger mb-3">
            {product.price.toLocaleString()} $
          </h3>

          <div className="d-flex align-items-center mb-4">
            <button
              className="btn btn-primary rounded-0 fw-bold px-3"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span className="mx-3 fw-bold fs-5">{quantity}</span>
            <button
              className="btn btn-primary rounded-0 fw-bold px-3"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            className="btn btn-submit-purple rounded-0"
            onClick={() => {
              if (!selectedSize) {
                alert("Vui lòng chọn size giày trước khi thêm vào giỏ!");
                return;
              }

              dispatch(
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  quantity: quantity,
                  size: selectedSize,
                }),
              );
              alert(
                `Đã thêm giày size ${selectedSize} vào giỏ hàng thành công!`,
              );
            }}
          >
            Add to cart
          </button>
        </div>
      </div>

      <h3 className="text-center mb-4">- Related Products -</h3>
      <div className="row">
        {product.relatedProducts.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            isLiked={likedProducts.includes(item.id)}
            onToggleLike={toggleLike}
          />
        ))}
      </div>
    </div>
  );
};

export default Detail;
