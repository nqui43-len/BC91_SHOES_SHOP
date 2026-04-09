import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const frm = useFormik({
    initialValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
    validationSchema: yup.object().shape({
      newPassword: yup
        .string()
        .required("Mật khẩu mới không được bỏ trống!")
        .min(6, "Mật khẩu phải từ 6 ký tự trở lên!"),
      newPasswordConfirm: yup
        .string()
        .required("Vui lòng xác nhận mật khẩu!")
        .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không khớp!"),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          alert("Vui lòng đăng nhập!");
          navigate("/login");
          return;
        }

        await axios.post(
          "https://shop.cyberlearn.vn/api/Users/changePassword",
          { newPassword: values.newPassword },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");

        localStorage.removeItem("accessToken");
        localStorage.removeItem("userEmail");

        navigate("/login");
      } catch (err: any) {
        console.log("Lỗi đổi mật khẩu:", err);
        alert("Đổi mật khẩu thất bại!");
      }
    },
  });

  return (
    <div className="container my-5">
      <h2 className="mb-3 fw-normal text-center" style={{ fontSize: "40px" }}>
        Change Password
      </h2>
      <hr
        className="mb-5 mx-auto"
        style={{ color: "#E0E0E0", borderTop: "2px solid", width: "50%" }}
      />

      <div className="row justify-content-center">
        <div className="col-md-5">
          <form
            onSubmit={frm.handleSubmit}
            className="p-4 border rounded shadow-sm bg-white"
          >
            {/* Nút quay lại Profile */}
            <div className="mb-4">
              <NavLink
                to="/profile"
                className="text-decoration-none text-secondary"
              >
                <i className="fa-solid fa-arrow-left me-2"></i> Back to Profile
              </NavLink>
            </div>

            {/* Ô nhập Mật khẩu mới */}
            <div className="mb-4">
              <label className="form-label text-secondary mb-1">
                New Password
              </label>
              <div className="input-group">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="form-control custom-input"
                  placeholder="Enter new password"
                  name="newPassword"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                <span
                  className="input-group-text password-eye"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <i
                    className={`fa-regular ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </span>
              </div>
              {frm.errors.newPassword && frm.touched.newPassword && (
                <div className="text-danger mt-1" style={{ fontSize: "14px" }}>
                  {frm.errors.newPassword}
                </div>
              )}
            </div>

            {/* Ô Xác nhận Mật khẩu mới */}
            <div className="mb-4">
              <label className="form-label text-secondary mb-1">
                Confirm New Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control custom-input"
                  placeholder="Confirm new password"
                  name="newPasswordConfirm"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                <span
                  className="input-group-text password-eye"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i
                    className={`fa-regular ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </span>
              </div>
              {frm.errors.newPasswordConfirm &&
                frm.touched.newPasswordConfirm && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {frm.errors.newPasswordConfirm}
                  </div>
                )}
            </div>

            <div className="mt-5 d-flex justify-content-end">
              <button type="submit" className="btn-submit-purple w-100">
                UPDATE PASSWORD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
