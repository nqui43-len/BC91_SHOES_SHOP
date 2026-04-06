import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<any>(null);

  const getProductDetail = async () => {
    try {
      const res = await axios.get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`);
      setProductDetail(res.data.content);
    } catch (err) {
      console.log('Lỗi lấy chi tiết:', err);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, [id]); 

  return (
    <div className="container mt-5">
      {!productDetail ? (
        <h3 className="text-center">Đang tải dữ liệu...</h3>
      ) : (
        <div className="row">
          <div className="col-4">
            <img src={productDetail.image} alt={productDetail.name} className="img-fluid" />
          </div>
          
          <div className="col-8">
            <h2>{productDetail.name}</h2>
            <p className="lead">{productDetail.description}</p>
            <h4 className="text-success">Giá: {productDetail.price}$</h4>
            
            <button className="btn btn-dark mt-3">Add to cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;