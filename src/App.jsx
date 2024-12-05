// import  { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Error from "./pages/Error";
// import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassoword";
import VerifyOtp from "./pages/VerifyOtp";
// import Preloader from "./components/Preloader"

function App() {



  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/success"  element={<Success/>}/>
        <Route path="/*" element={<Error />} />
        <Route path="/login" element={<Login />} />       
        <Route path="/signup" element={<Signup />} />   
        <Route path="/forgot-password" element={<ResetPassword />} />  
        <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App