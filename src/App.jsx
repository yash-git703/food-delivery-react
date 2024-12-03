import  { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Error from "./pages/Error";
// import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassoword";
import VerifyOtp from "./pages/VerifyOtp";
import Preloader from "./components/Preloader"

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the preloader has already been shown
    const preloaderShown = localStorage.getItem("preloaderShown");

    if (preloaderShown) {
      // If the preloader was already shown, skip it
      setLoading(false);
    } else {
      // Otherwise, show the preloader
      const timer = setTimeout(() => {
        setLoading(false);
        // Mark the preloader as shown in local storage
        localStorage.setItem("preloaderShown", "true");
      }, 5000); // 5-second preloader

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, []);

  if (loading) {
    return <Preloader />; // Render the preloader only if loading
  }

  
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