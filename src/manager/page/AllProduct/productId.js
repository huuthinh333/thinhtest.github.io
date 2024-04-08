import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { productId } = useParams();

  // Gọi API hoặc xử lý dữ liệu sản phẩm tương ứng với productId ở đây

  return (
    <div>
      <h1>Product Page</h1>
      <p>Product ID: {productId}</p>
      {/* Hiển thị thông tin sản phẩm tương ứng */}
    </div>
  );
};

export default ProductPage;
