import React, { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import './JsonForm.css';
import Bill from './Bill';
import { useNavigate } from 'react-router-dom';
const BillForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [jsonForm, setJsonForm] = useState('');
  const [user, setUser] = useState();
  const [jsonSchema, setjsonSchema] = useState({});

  const app = new Realm.App({ id: process.env.REACT_APP_KEY });
  const navigate = useNavigate();
  useEffect(()=>{
   refreshAccessToken()
 },[])
 const refreshAccessToken = async()=>{
  try {
    if(!app.currentUser?.accessToken) {navigate('/managerofinan/login');}
    await app?.currentUser?.refreshAccessToken()
    
    setUser(app?.currentUser)
  } catch (error) {
    if(!app.currentUser?.accessToken) {navigate('/managerofinan/login');}
  }
}
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means it runs once on mount

  const fetchData = async () => {
    try {
      const functionName = 'UseModule';
      const arg = ['Bill_Module', app?.currentUser?.id];

      await app?.currentUser?.callFunction(functionName, ...arg);
      const findCart = await app?.currentUser?.callFunction("BillJsonForm");
      setJsonForm(findCart[0]?.public?.output?.jsonData?.product);
      setjsonSchema(findCart[0]?.public?.input?.jsonSchema);
      console.log(findCart)
      setUser(app.currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async ({ formData }) => {
    
  
    const arg=[formData,app?.currentUser?.id]
    try {
   
      await app.currentUser.callFunction("updateoption",...arg);
      fetchData();
      setShowForm(false); // Ẩn form sau khi submit
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormClick = () => {
    setShowForm(true); // Hiển thị form khi người dùng nhấn vào chữ "Form"
  };

  return (
    <>
      {user ? (
        <div className="container mx-auto px-4 py-8">
          <div className="containers">
            {showForm ? (
              jsonSchema && (
                <Form
                  schema={jsonSchema}
                  onSubmit={handleSubmit}
                  validator={validator}
                />
              )
            ) : (
              <div className="form-text" onClick={handleFormClick}>
                Ấn vào đây để mở form
              </div>
            )}
          </div>
          <Bill jsonData={jsonForm}/>
        </div>
      ) : (
        <div> Đăng nhập đã nhé!</div>
      )}
    </>
  );
};

export default BillForm;
