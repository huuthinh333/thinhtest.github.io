import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Realm from "realm-web";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const registerUser = async () => {
    if (isLoading) {
      return; // Tránh nhấn nút nhiều lần trong khi đang xử lý
    }

    setIsLoading(true);

    const app = new Realm.App({ id: process.env.REACT_APP_KEY });

    // Kiểm tra xem mật khẩu và mật khẩu xác nhận có khớp nhau không
    if (password !== confirmPassword) {
      setRegistrationStatus("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await app.emailPasswordAuth.registerUser({ email, password });
      setRegistrationStatus("Registration successful!");
    } catch (error) {
      const errorMessage = error.error;
      const uppercasedErrorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
    alert(uppercasedErrorMessage);
      setRegistrationStatus("Registration failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng Ký</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Mật khẩu:
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
            Xác nhận mật khẩu:
          </label>
          <input
            className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:border-indigo-500"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className={`w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={registerUser}
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>

        {registrationStatus && (
          <p className={`mt-4 ${registrationStatus === "Registration successful!" ? "text-green-500" : "text-red-500"}`}>
            {registrationStatus}
          </p>
        )}

        <p className="mt-4 text-center">
          Đã có tài khoản? <Link to="/managerofinan/login" className="text-indigo-500">Quay lại đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
