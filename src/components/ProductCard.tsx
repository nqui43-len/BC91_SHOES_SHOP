import { NavLink } from "react-router-dom";

export interface ProductModel {
  id: number;
  name: string;
  price: number;
  image: string;
  shortDescription: string;
}

interface ProductCardProps {
  item: ProductModel;
  isLiked: boolean;
  onToggleLike: (id: number) => void;
}

const ProductCard = ({ item, isLiked, onToggleLike }: ProductCardProps) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="product-card h-100">
        <div className="product-img-box">
          <img src={item.image} alt={item.name} className="img-fluid" />

          <i
            className={`${isLiked ? "fa-solid text-danger" : "fa-regular text-dark"} fa-heart heart-icon`}
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.2)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => onToggleLike(item.id)}
            title={isLiked ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
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
          <div className="btn-price">{item.price.toLocaleString()} $</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
