import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

export interface ProductDetailModel {
  id: number;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  size: string[];
  relatedProducts: any[];
}

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<ProductDetailModel | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const getProductDetail = async () => {
    try {
      const res = await axios.get(
        `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
      );
      setProduct(res.data.content);
    } catch (err) {}
  };

  useEffect(() => {
    getProductDetail();
    setQuantity(1);
    setSelectedSize("");
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h3>Đang tải dữ liệu...</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row mb-5">
        <div className="col-md-4 d-flex justify-content-center align-items-center bg-light p-4">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: "350px", objectFit: "contain" }}
          />
        </div>

        <div className="col-md-8 px-md-5">
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

              if (product) {
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
              }
            }}
          >
            Add to cart
          </button>
        </div>
      </div>

      <h3 className="text-center mb-4">- Realate Product -</h3>
      <div className="row">
        {product.relatedProducts.map((item) => (
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
    </div>
  );
};

export default Detail;
