import React, { useState, useEffect } from 'react';
import * as Realm from 'realm-web';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import './Myform.css';



const AllProduct = () => {
  const app = new Realm.App({ id: process.env.REACT_APP_KEY });

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState();
  const [jsonSchema, setjsonSchema] = useState({});
  const [uiSchema, setuiSchema] = useState({});


  useEffect(() => {
    refreshAccessToken();
  }, []);

  const refreshAccessToken = async () => {
    
   try {
    await app?.currentUser?.refreshAccessToken();
      setUser(app?.currentUser);
    
   } catch (error) {
    console.log(error.error)
   }
      
   
  };

  useEffect(() => {
    fetchData();
  }, [app.currentUser]); // Thêm app.currentUser vào mảng dependency để useEffect được gọi lại khi currentUser thay đổi

  const fetchData = async () => {
    const FunctionName = 'form';
    const functionName = 'UseModule';
    const arg = ['Cart_Module', app?.currentUser?.id];
    try {
      await app?.currentUser?.callFunction(functionName, ...arg);
      const findCart = await app?.currentUser?.callFunction(FunctionName);
      console.log(findCart);
      setjsonSchema(findCart[0]?.public?.input?.jsonSchema);
      setProducts(findCart[0]?.public?.output?.jsonData?.products);
      setUser(app.currentUser);
      setuiSchema(findCart[0]?.public?.input?.uiSchema);
    } catch (error) {
      console.log(error)
    }
   
  };

  const handleSubmit = async (formData) => {
    const FunctionName = 'QueryProducts';
    const args = [formData.formData, app?.currentUser?.id];

    try {
      const result = await app?.currentUser?.callFunction(FunctionName, ...args);
      fetchData();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user ? (
        <>
          {jsonSchema && uiSchema && (
            <div className="container mx-auto p-4 relative">
              <div className="mb-4">
                <div className="flex justify-center">
                  <Form
                    className="w-full max-w-md p-8 rounded-lg shadow-lg"
                    validator={validator}
                    schema={jsonSchema}
                    uiSchema={uiSchema}
                    onSubmit={handleSubmit}
                  />
                </div>
              </div>
            </div>
          )}
          {products.length > 0 && ( // Thêm kiểm tra products trước khi map
            <table className="border-collapse border border-green-800 w-full">
              <thead>
                <tr>
                  <th className="border border-green-600 px-4 py-2">Tên sản phẩm</th>
                  <th className="border border-green-600 px-4 py-2">Loại sản phẩm</th>
                  <th className="border border-green-600 px-4 py-2">Giá mua</th>
                  <th className="border border-green-600 px-4 py-2">Giá bán</th>
                  <th className="border border-green-600 px-4 py-2">Số lượng</th>
                  <th className="border border-green-600 px-4 py-2">Ngày nhập</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="border border-green-600 px-4 py-2">{product.productName}</td>
                    <td className="border border-green-600 px-4 py-2">{product.productType}</td>
                    <td className="border border-green-600 px-4 py-2">{product.purchasePrice}</td>
                    <td className="border border-green-600 px-4 py-2">{product.sellingPrice}</td>
                    <td className="border border-green-600 px-4 py-2">{product.quantity}</td>
                    <td className="border border-green-600 px-4 py-2">
                      {product.dateImported.year}/{product.dateImported.month}/{product.dateImported.day}/
                      {product.dateImported.hour} {product.dateImported.period}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <div> Bạn phải đăng nhập đã nhé</div>
      )}
    </>
  );
};

export default AllProduct;
