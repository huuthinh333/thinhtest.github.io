import React, { useEffect, useState, Suspense, lazy } from 'react';

import { useNavigate } from 'react-router-dom';
import * as Realm from 'realm-web';

const ManagerHome = () => {
  const app = new Realm.App({ id: process.env.REACT_APP_KEY });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      if (!app?.currentUser?.accessToken) {
        navigate('/managerofinan/login');
      } else {
        await app?.currentUser?.refreshAccessToken();
      }
    } catch (error) {
    
      console.log(error);
    }
  };



  return (
    <div>
 
    </div>
  );
};

export default ManagerHome;
