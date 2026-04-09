import { useState } from "react";

// 1. Dữ liệu mảng địa chỉ mới từ API
const storeList = [
  {
    id: 2,
    name: "Hiếu Sneakers",
    alias: "hieu-sneakers",
    latitude: "10.766579",
    longtitude: "106.665268",
    description: "589 3 tháng 2 quận 10",
    image: "https://shop.cyberlearn.vn/images/store2.jpg",
    deleted: false,
  },
  {
    id: 3,
    name: "Nguyên Sneaker",
    alias: "nguyen-sneaker",
    latitude: "10.768494",
    longtitude: "106.666778",
    description: "46 thành thái quận 10",
    image: "https://shop.cyberlearn.vn/images/store3.jpg",
    deleted: false,
  },
  {
    id: 532,
    name: "King Shoess",
    alias: "king-shoess",
    latitude: "",
    longtitude: "",
    description: "192/2 Nguyễn Thái Bình",
    image:
      "https://kingshoes.vn/data/upload/media/SNEAKER-315122-111-AIR-FORCE-1-07-NIKE-KINGSHOES.VN-TPHCM-TANBINH-17-logo-1551924204-.jpg",
    deleted: false,
  },
];

const StoreLocation = () => {
  const activeStores = storeList.filter((store) => !store.deleted);
  const [activeStore, setActiveStore] = useState(activeStores[0]);

  // 2. Hàm thông minh: Ưu tiên Tọa độ -> Nếu thiếu thì dùng Địa chỉ chữ
  const getMapEmbedUrl = (store: any) => {
    // Nếu có cả vĩ độ (latitude) và kinh độ (longtitude)
    if (store.latitude && store.longtitude) {
      return `https://maps.google.com/maps?q=${store.latitude},${store.longtitude}&hl=vi&z=16&output=embed`;
    }
    // Fallback: Nếu không có tọa độ, tự động gộp Tên + Địa chỉ để Google tự tìm
    const searchQuery = `${store.name}, ${store.description}`;
    return `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&hl=vi&z=16&output=embed`;
  };

  return (
    <div className="container my-5">
      <h3 className="text-center mb-5 fw-normal" style={{ fontSize: "32px" }}>
        - Hệ Thống Cửa Hàng -
      </h3>

      <div className="row">
        {/* CỘT TRÁI: Danh sách các cửa hàng */}
        <div className="col-md-4 mb-4">
          <div className="list-group shadow-sm">
            {activeStores.map((store) => (
              <button
                key={store.id}
                type="button"
                className={`list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 ${activeStore.id === store.id ? "bg-dark text-white" : ""}`}
                onClick={() => setActiveStore(store)}
                style={{ cursor: "pointer", transition: "all 0.3s" }}
              >
                {/* Ảnh nhỏ của cửa hàng */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    flexShrink: 0,
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <img
                    src={store.image}
                    alt={store.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/60?text=No+Image")
                    }
                  />
                </div>

                {/* Thông tin cửa hàng */}
                <div>
                  <h6 className="mb-1 fw-bold">{store.name}</h6>
                  <p
                    className="mb-0"
                    style={{ fontSize: "13px", opacity: 0.9 }}
                  >
                    <i className="fa-solid fa-location-dot me-1"></i>{" "}
                    {store.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI: Hiển thị Bản đồ */}
        <div className="col-md-8">
          <div
            className="shadow-sm h-100"
            style={{
              minHeight: "450px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <iframe
              src={getMapEmbedUrl(activeStore)}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "450px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Bản đồ ${activeStore.name}`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocation;
