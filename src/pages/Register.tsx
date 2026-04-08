import React from "react";

const Register = () => {
  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4 fw-bold" style={{ fontSize: "30px" }}>
        Register
      </h2>
      <div className="row justify-content-center">
        <div className="col-8">
          <form className="p-4 border rounded shadow-sm bg-white">
            <div className="row">
              /* Cột trái */
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Password Confirm
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password Confirm"
                  />
                </div>
              </div>
              /* Cột phải */
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                  />
                </div>
                /* Chọn giới tính (Radio Butoon) */
                <div className="mb-3">
                  <label className="form-label fw-semibold d-block">
                    Gender
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="true"
                      defaultChecked
                    />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="false"
                    />
                    <label className="form-check-label">Female</label>
                  </div>
                </div>
                /* Nút Submit */
                <button
                  type="submit"
                  className="btn text-white mt-3 px-5 py-2 fw-bold"
                  style={{ backgroundColor: "#6200EE", borderRadius: "50px" }}
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
