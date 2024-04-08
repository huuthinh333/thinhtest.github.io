import React from 'react'
import {  Link } from 'react-router-dom';
const home = () => {
 
  return (
    <div>Đây là trang web bán hàng in ấn
   
   
   <Link to="/managerofinan/login" className="text-blue-500 mr-4">
                Đăng nhập
              </Link>
    
    </div>
  )
}
 
export default home