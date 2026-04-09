import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"history" | "favourite">(
    "history",
  );
  const [avatarPreview, setAvatarPreview] = useState(
    "https://i.pravatar.cc/300",
  );
  const [ordersHistory, setOrdersHistory] = useState<any[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const frm = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      gender: true,
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.post(
          "https://shop.cyberlearn.vn/api/Users/updateProfile",
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        alert("Cập nhật thông tin thành công!");
      } catch (err) {
        alert("Cập nhật thất bại!");
      }
    },
  });

  const getProfileData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.post(
        "https://shop.cyberlearn.vn/api/Users/getProfile",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const profile = res.data.content;
      frm.setValues({
        email: profile.email,
        name: profile.name,
        phone: profile.phone,
        gender: profile.gender,
        password: "",
      });
      setOrdersHistory(profile.ordersHistory || []);
      setFavoriteProducts(profile.productsFavorite || []);
    } catch (err) {}
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="container my-5" style={{ minHeight: "60vh" }}>
      <div className="profile-header-gradient w-50">Profile</div>
      <div className="row mb-5">
        <div className="col-md-3 text-center">
          <div
            className="avatar-container mb-3"
            onClick={() => fileInputRef.current?.click()}
          >
            <img src={avatarPreview} alt="Avatar" className="avatar-img" />
            <div className="avatar-overlay">
              <i className="fa-solid fa-camera mb-1"></i> <br /> Change
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className="col-md-9">
          <form onSubmit={frm.handleSubmit}>
            <div className="row gx-5">
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label text-secondary mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control custom-input"
                    name="email"
                    value={frm.values.email}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-secondary mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    name="phone"
                    value={frm.values.phone}
                    onChange={frm.handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label text-secondary mb-1">Name</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    name="name"
                    value={frm.values.name}
                    onChange={frm.handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-secondary mb-1">
                    Password
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-secondary custom-input w-100 text-start"
                    onClick={() => navigate("/change-password")}
                  >
                    <i className="fa-solid fa-lock me-2"></i> Change Password...
                  </button>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="d-flex align-items-center">
                    <label className="form-label text-secondary mb-0 me-4">
                      Gender
                    </label>
                    <div className="form-check form-check-inline mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        checked={frm.values.gender === true}
                        onChange={() => frm.setFieldValue("gender", true)}
                      />
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        checked={frm.values.gender === false}
                        onChange={() => frm.setFieldValue("gender", false)}
                      />
                      <label className="form-check-label">Female</label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn-submit-purple px-4 py-2"
                    style={{ borderRadius: "50px" }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="profile-tabs">
        <div
          className={`tab-item ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          Order history
        </div>
        <div
          className={`tab-item ${activeTab === "favourite" ? "active" : ""}`}
          onClick={() => setActiveTab("favourite")}
        >
          Favourite
        </div>
      </div>
      <div className="tab-content">
        {activeTab === "history" &&
          ordersHistory.map((order, index) => (
            <div key={index} className="mb-5">
              <div className="order-date-title">
                + Orders have been placed on{" "}
                {new Date(order.date).toLocaleDateString()}
              </div>
              <div className="table-responsive">
                <table className="table align-middle text-center">
                  <thead className="order-table-header">
                    <tr>
                      <th>id</th>
                      <th>img</th>
                      <th>name</th>
                      <th>price</th>
                      <th>quantity</th>
                      <th>total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderDetail.map((item: any, idx: number) => (
                      <tr key={idx}>
                        <td>{item.id || idx + 1}</td>
                        <td>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "50px" }}
                          />
                        </td>
                        <td className="fw-medium">{item.name}</td>
                        <td className="fw-bold">{item.price}$</td>
                        <td>
                          <div className="qty-display mx-auto">1</div>
                        </td>
                        <td className="fw-bold text-danger">{item.price}$</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        {activeTab === "favourite" && (
          <div className="row">
            {favoriteProducts.length === 0 ? (
              <div className="col-12 text-center text-secondary py-5">
                <h5>Bạn chưa có sản phẩm yêu thích nào.</h5>
                <p>
                  Hãy ra trang chủ và thả tim cho những đôi giày bạn thích nhé!
                </p>
              </div>
            ) : (
              favoriteProducts.map((item) => (
                <div className="col-4 mb-4" key={item.id}>
                  <div className="product-card">
                    <div className="product-img-box">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid"
                      />
                      <i className="fa-solid fa-heart heart-icon text-danger"></i>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{item.name}</h5>
                      <p className="product-desc">{item.shortDescription}</p>
                    </div>
                    <div className="product-action">
                      <NavLink
                        to={`/detail/${item.id}`}
                        className="btn-buy-now"
                      >
                        Buy now
                      </NavLink>
                      <div className="btn-price">
                        {item.price?.toLocaleString()} $
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
