import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Success = () => {
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // To control success message display
  const navigate = useNavigate();

  const clearCart = async () => {
    try {
      const res = await axios.get("https://food-delivery-react-1.onrender.com/api/clear-cart");
      const data = res.data;
      toast.success(data.message); // Notify user cart has been cleared
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error("Failed to clear the cart.");
    }
  };

  useEffect(() => {
    // Trigger clear cart API on component mount
    clearCart();
  }, []);

  useEffect(() => {
    // Handle loader, success message, and redirection
    const timer = setTimeout(() => {
      setLoading(false); // Stop loader after 3 seconds
      setShowSuccessMessage(true); // Show success message
    }, 3000);

    // Redirect to home page 2 seconds after success message is displayed
    const redirectTimer = setTimeout(() => {
      if (!loading && showSuccessMessage) {
        navigate("/"); // Navigate to the home page
      }
    }, 5000); // Total delay of 5 seconds (3s loader + 2s success message)

    // Cleanup timers when component unmounts
    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [loading, showSuccessMessage, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <PropagateLoader color="#36d7b7" />
      ) : showSuccessMessage ? (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Order Successful!</h2>
          <p>Your order has been successfully placed.</p>
        </div>
      ) : null}
    </div>
  );
};

export default Success;
