import React, { useState } from 'react';

const Bill = ({ jsonData }) => {
  const [openUserBillDetails, setOpenUserBillDetails] = useState({});

  const toggleUserBillDetails = (userBillIndex) => {
    setOpenUserBillDetails((prevState) => ({
      ...prevState,
      [userBillIndex]: !prevState[userBillIndex],
    }));
  };

  return (
    <>
      {jsonData ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Đơn hàng</th>
                <th className="px-4 py-2">Ngày mua</th>
                <th className="px-4 py-2">Giờ mua</th>
                <th className="px-4 py-2">Người mua</th>
                <th className="px-4 py-2">ID người mua</th>
              </tr>
            </thead>
            <tbody>
              {jsonData?.map((userBill, userBillIndex) => (
                <React.Fragment key={userBillIndex}>
                  <tr> 
                    <td>
                      <button onClick={() => toggleUserBillDetails(userBillIndex)} className="mt-4 form-text py-2 px-4 rounded">
                        {openUserBillDetails[userBillIndex] ? 'Ẩn' : 'Chi tiết'}
                      </button>
                    </td>
                    <td className="border px-4 py-2">{userBill?.date?.day}/{userBill?.date?.month}/{userBill?.date?.year}</td>
                    <td className="border px-4 py-2">{userBill?.date?.hour}.{userBill?.date?.period}</td>
                    <td className="border px-4 py-2">{userBill?.user}</td>
                    <td className="border px-4 py-2">{userBill?.userId}</td>
                  </tr>
                  {openUserBillDetails[userBillIndex] && (
                    <tr>
                      <td colSpan="5">
                        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
                          <div className="bg-white p-8 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4">Chi tiết đơn hàng</h2>
                            <ul>
                              {userBill?.cart?.map((product, productIndex) => (
                                <li key={productIndex} className="border p-4 mb-2">
                                  <p className="font-semibold">Tên sản phẩm: {product.productName}</p>
                                  <p>Loại sản phẩm: {product.productType}</p>
                                  <p>Số lượng: {product.quantity}</p>
                                  <p>Giá bán: {product.sellingPrice}</p>
                                </li>
                              ))}
                            </ul>
                            <button onClick={() => toggleUserBillDetails(userBillIndex)} className="mt-4 form-text py-2 px-4 rounded">
                              Đóng
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">
          Không có dữ liệu đơn hàng trong thời gian này
        </div>
      )}
    </>
  );
};

export default Bill;
