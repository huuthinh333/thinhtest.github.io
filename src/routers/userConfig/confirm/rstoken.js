// src/components/RegisterToken.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Realm from 'realm-web';

const ResetPasswordToken = () => {
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const confirmUser = async () => {
      const app = new Realm.App({ id: process.env.REACT_APP_KEY });

      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const tokenId = params.get('tokenId');
      console.log(token,tokenId)
      if (!isButtonPressed || !token || !tokenId) {
        return; // Không chạy nếu nút chưa được nhấn hoặc không có token hoặc tokenId
      }

      if (password !== confirmPassword) {
        setConfirmationStatus("Passwords do not match.");
        return;
      }
        console.log(password)
      try {
        await app.emailPasswordAuth.confirmUser(password,token, tokenId);
        console.log('Resetpassword confirmed successfully!');
        setConfirmationStatus('Resetpassword confirmed successfully!');
        // Chuyển hướng về trang đăng nhập khi người dùng đã được xác nhận và nút đã được nhấn
        navigate('/managerofinan');
      } catch (error) {
        console.error('Resetpassword confirmation failed:', error);
        setConfirmationStatus('Resetpassword confirmation failed');
      }
    };

    confirmUser();
  }, [isButtonPressed, password, confirmPassword, navigate]);

  const handleButtonClick = () => {
    // Đặt trạng thái nút thành true khi nút được nhấn
    setButtonPressed(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <p className="mb-4">{confirmationStatus}</p>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:border-indigo-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:border-indigo-500"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleButtonClick}
        >
          Confirm New Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordToken;
