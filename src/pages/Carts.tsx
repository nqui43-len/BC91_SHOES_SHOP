import { useSelector, useDispatch } from "react-redux";
import { changeQuantity, removeFromCart } from "../store/cartSlice";
import type { RootState } from "../store/store";

const Carts = () => {
  const dispatch = useDispatch();
  // Kéo dữ liệu giỏ hàng từ Redux xuống
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="container my-5" style={{ minHeight: "60vh" }}>
      <h2 className="mb-3 fw-normal" style={{ fontSize: "40px" }}>
        Carts
      </h2>
      <hr
        className="mb-4"
        style={{ color: "#E0E0E0", borderTop: "2px solid" }}
      />

      {/* Rẽ nhánh: Nếu giỏ rỗng thì báo rỗng, nếu có hàng thì vẽ bảng */}
      {cart.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-secondary">Giỏ hàng của bạn đang trống!</h4>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              {/* Dòng Tiêu đề (Header) */}
              <thead className="cart-header-row text-center">
                <tr>
                  <th scope="col" className="p-3">
                    <input type="checkbox" />
                  </th>
                  <th scope="col">id</th>
                  <th scope="col">img</th>
                  <th scope="col">name</th>
                  <th scope="col">size</th>
                  <th scope="col">price</th>
                  <th scope="col">quantity</th>
                  <th scope="col">total</th>
                  <th scope="col" className="pe-0">
                    action
                  </th>
                </tr>
              </thead>

              {/* Thân bảng (Danh sách sản phẩm) */}
              <tbody className="text-center align-middle">
                {cart.map((item) => (
                  <tr key={`${item.id}-${item.size}`}>
                    <td className="p-3">
                      <input type="checkbox" defaultChecked />
                    </td>
                    <td>{item.id}</td>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "60px", objectFit: "contain" }}
                      />
                    </td>
                    <td className="fw-medium">{item.name}</td>
                    <td>
                      <span className="badge bg-secondary">{item.size}</span>
                    </td>
                    <td className="fw-bold">{item.price.toLocaleString()}$</td>

                    {/* Cột Tăng giảm số lượng */}
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        <button
                          className="btn-qty"
                          onClick={() =>
                            dispatch(
                              changeQuantity({
                                id: item.id,
                                size: item.size,
                                amount: 1,
                              }),
                            )
                          }
                        >
                          +
                        </button>
                        <div className="qty-display">{item.quantity}</div>
                        <button
                          className="btn-qty"
                          onClick={() =>
                            dispatch(
                              changeQuantity({
                                id: item.id,
                                size: item.size,
                                amount: -1,
                              }),
                            )
                          }
                        >
                          -
                        </button>
                      </div>
                    </td>

                    <td className="fw-bold text-danger">
                      {(item.price * item.quantity).toLocaleString()}$
                    </td>

                    {/* Cột Hành động (Action) */}
                    <td className="pe-0">
                      <div className="d-flex gap-2">
                        <button className="btn-edit-cart">EDIT</button>
                        <button
                          className="btn-delete-cart"
                          onClick={() =>
                            dispatch(
                              removeFromCart({ id: item.id, size: item.size }),
                            )
                          }
                        >
                          DELETE
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nút Đặt hàng nằm dưới cùng bên phải */}
          <div className="d-flex justify-content-end mt-4">
            <button className="btn-submit-order">SUBMIT ORDER</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carts;
