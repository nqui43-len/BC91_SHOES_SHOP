import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginAction } from "../store/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email không được bỏ trống!")
        .email("Email không đúng định dạng!"),
      password: yup.string().required("Mật khẩu không được bỏ trống!"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "https://shop.cyberlearn.vn/api/Users/signin",
          values,
        );

        const token = res.data.content.accessToken;
        const email = res.data.content.email;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("userEmail", email);

        dispatch(loginAction(email));

        alert("Đăng nhập thành công! Chào mừng trở lại!");
        navigate("/");
      } catch (err: any) {
        alert("Đăng nhập thất bại! Sai email hoặc mật khẩu!");
      }
    },
  });

  return (
    <div className="container my-5">
      <h2 className="mb-3 fw-normal" style={{ fontSize: "40px" }}>
        Login
      </h2>
      <hr
        className="mb-5"
        style={{ color: "#E0E0E0", borderTop: "2px solid" }}
      />

      <div className="row justify-content-center">
        {/* Responsive Layout */}
        <div className="col-12 col-md-8 col-lg-6">
          <form onSubmit={frm.handleSubmit}>
            <div className="mb-4">
              <label className="form-label text-secondary mb-1">Email</label>
              <input
                type="email"
                className="form-control custom-input"
                placeholder="email"
                name="email"
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
              />
              {frm.errors.email && frm.touched.email && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {frm.errors.email}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary mb-1">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control custom-input"
                  placeholder="password"
                  name="password"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                <span
                  className="input-group-text password-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fa-regular ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
              {frm.errors.password && frm.touched.password && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {frm.errors.password}
                </div>
              )}
            </div>

            <div className="mt-4 d-flex flex-wrap justify-content-end align-items-center gap-3">
              <NavLink to="/register" className="register-link text-primary">
                Register now ?
              </NavLink>
              <button
                type="submit"
                className="btn-submit-purple w-100 w-sm-auto"
              >
                LOGIN
              </button>
            </div>

            <div className="mt-4">
              <button type="button" className="btn-facebook w-100">
                <i className="fa-brands fa-facebook me-2"></i>
                Continue with Facebook
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
