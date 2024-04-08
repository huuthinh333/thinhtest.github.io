import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Realm from 'realm-web';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const app = useMemo(() => new Realm.App({ id: process.env.REACT_APP_KEY }), []);

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means it runs once on mount

  const fetchData = async () => {
    try {
  
      await app?.currentUser?.refreshAccessToken();
   if (app.currentUser?.customData?.type === "Manager") {
      navigate('/managerofinan/bill')
    }
    } catch (error) {
     alert(error.error)
    }
  };

  const loginEmailPassword = async () => {
    if (isLoading) {
      return; // Avoid pressing the button multiple times while processing
    }

    setIsLoading(true);

    try {
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await app.logIn(credentials);
    

      if (user.customData?.type === "Manager") {
      navigate('/managerofinan/bill')
    }
    } catch (error) {
      const errorMessage = error.error;
      const uppercasedErrorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
    alert(uppercasedErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleAuth = async () => {
  //   try {
  //     const redirectUrl = "http://localhost:3000/inan-rjsf/api/auth/callback/google";
  //     const credentials = Realm.Credentials.google({ redirectUrl });
  //     const user = await app.logIn(credentials);

  //     if (user.customData?.type === "normal") {
  //       navigate('/inan-rjsf/products');
  //     } else if (user.customData?.type === "Admin") {
  //       navigate('/inan-rjsf/admin/addproduct')
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng Nhập</h2>
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
        <button
          className={`w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={loginEmailPassword}
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
        <p className="mt-4 text-center">
          Chưa có tài khoản? <Link to="/managerofinan/register" className="text-indigo-500">Đăng ký</Link>
        </p>
        <p className="mt-4 text-center">
          Quên mật khẩu? <Link to="/managerofinan/resetpassword" className="text-indigo-500">Tìm mật khẩu ngay!</Link>
        </p>
        {/*  <div className="flex items-center justify-center mt-4  mb-4">
          <span className="mr-4 border-b w-1/4"></span>
          <p>Hoặc</p>
          <span className="ml-4 border-b w-1/4"></span>
        </div>
       <button
          className={`w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleGoogleAuth}
          disabled={isLoading}
        >
          Đăng nhập bằng Google
        </button>*/}
      </div>
    </div>
  );
  
  
        };  
export default Login;
