import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import AdHome from './components/Admin/AdHome.jsx';
import ElHome from './components/Electrician/ElHome.jsx';
import AdComp from './components/Admin/AdComp.jsx';
import AddEl from './components/Admin/AddEl.jsx';
import AddCom from './components/Admin/AddCom.jsx';
import Login from './components/Electrician/Login.jsx';
import ElHome2 from './components/Electrician/ElHome2.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/admin/electrician" element={<AdHome />} />
      <Route path="/admin/complaint" element={<AdComp />} />
      <Route path="/admin/addel" element={<AddEl />} />
      <Route path="/admin/addcom" element={<AddCom />} />
      <Route path="/electrician" element={<ElHome />} />
      <Route path="/electrician/complaint" element={<ElHome2 />} />
      <Route path="/electrician-login" element={<Login />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);