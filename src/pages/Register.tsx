import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // 1. Quản lý trạng thái Bật/Tắt con mắt (Mật khẩu)
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const navigate = useNavigate();

  // 2. Khởi tạo anh Quản lý (Formik) và anh Bảo vệ (Yup)
  const frm = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phone: '',
      gender: true,
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email không được bỏ trống!').email('Email không đúng định dạng!'),
      password: yup.string().required('Mật khẩu không được bỏ trống!').min(6, 'Mật khẩu phải từ 6 ký tự trở lên!'),
      passwordConfirm: yup.string()
        .required('Vui lòng xác nhận mật khẩu!')
        .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp!'),
      name: yup.string().required('Tên không được bỏ trống!'),
      phone: yup.string().required('Số điện thoại không được bỏ trống!').matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số!'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('https://shop.cyberlearn.vn/api/Users/signup', values);
        
        alert('Đăng ký thành công!');
        
        navigate('/login'); 
      } catch (err: any) {
        console.log('Lỗi đăng ký:', err);
        alert('Đăng ký thất bại: ' + err.response?.data?.message);
      }
    }
  });

  return (
    <div className="container my-5">
      {/* Title căn trái */}
      <h2 className="mb-3 fw-normal" style={{ fontSize: '40px' }}>Register</h2>
    <hr className="mb-5" style={{ color: '#DEDDDC', borderTop: '2px solid' }} />
      <form onSubmit={frm.handleSubmit}>
        <div className="row gx-5">
          
          {/* CỘT TRÁI */}
          <div className="col-md-6">
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
              {frm.errors.email && frm.touched.email && <div className="text-danger mt-1" style={{ fontSize: '12px' }}>{frm.errors.email}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary mb-1">Password</label>
              <div className="input-group">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-control custom-input" 
                  placeholder="password"
                  name="password"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                {/* Nút bấm con mắt */}
                <span className="input-group-text password-eye" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </span>
              </div>
              {frm.errors.password && frm.touched.password && <div className="text-danger mt-1" style={{ fontSize: '12px' }}>{frm.errors.password}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary mb-1">Password confirm</label>
              <div className="input-group">
                <input 
                  type={showPasswordConfirm ? 'text' : 'password'} 
                  className="form-control custom-input" 
                  placeholder="password confirm"
                  name="passwordConfirm"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                <span className="input-group-text password-eye" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                  <i className={`fa-regular ${showPasswordConfirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </span>
              </div>
              {frm.errors.passwordConfirm && frm.touched.passwordConfirm && <div className="text-danger mt-1" style={{ fontSize: '12px' }}>{frm.errors.passwordConfirm}</div>}
            </div>
          </div>

          {/* CỘT PHẢI */}
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label text-secondary mb-1">Name</label>
              <input 
                type="text" 
                className="form-control custom-input" 
                placeholder="name" 
                name="name"
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
              />
              {frm.errors.name && frm.touched.name && <div className="text-danger mt-1" style={{ fontSize: '12px' }}>{frm.errors.name}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary mb-1">Phone</label>
              <input 
                type="text" 
                className="form-control custom-input" 
                placeholder="phone" 
                name="phone"
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
              />
              {frm.errors.phone && frm.touched.phone && <div className="text-danger mt-1" style={{ fontSize: '12px' }}>{frm.errors.phone}</div>}
            </div>

            <div className="mb-4 d-flex align-items-center mt-4">
              <label className="form-label text-secondary mb-0 me-4">Gender</label>
              <div className="form-check form-check-inline mb-0">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="gender" 
                  value="true" 
                  defaultChecked 
                  onChange={frm.handleChange}
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check form-check-inline mb-0">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="gender" 
                  value="false" 
                  onChange={frm.handleChange}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn-submit-purple">SUBMIT</button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default Register;