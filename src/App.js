import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const Home = lazy(() => import('./routers/home'));
const Login = lazy(() => import('./routers/userConfig/interact/login'));
const Register = lazy(() => import('./routers/userConfig/interact/register'));
const ResetPassword = lazy(() => import('./routers/userConfig/interact/rspassword'));
const ResetPasswordToken = lazy(() => import('./routers/userConfig/confirm/rstoken'));
const Managerhome = lazy(() => import('./manager/managerhome'));
const ProductPage = lazy(() => import('./manager/page/AllProduct/productId'));
const AllProduct = lazy(() => import( './manager/page/AllProduct/AllProduct'));
const BillForm = lazy(() => import( './manager/page/BillForm/BillForm'))
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/managerofinan/bill" element={<BillForm />} />
          <Route path="/managerofinan/manager" element={<Managerhome />} />
          <Route path="/managerofinan/products" element={<AllProduct />} />
          <Route path="/managerofinan" element={<Home />} />
          <Route path="/managerofinan/login" element={<Login />} />
          <Route path="/managerofinan/register" element={<Register />} />
          <Route path="/managerofinan/resetpassword" element={<ResetPassword />} />
          <Route path="/managerofinan/rspwtoken" element={<ResetPasswordToken />} />
          <Route path="/managerofinan/manager/:productId" element={<ProductPage />} /> 
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
