import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

axios.defaults.withCredentials = true;

const Success = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      clearCart(); // Clear the cart after loading completes
    }, 3000);
  }, []);

  const clearCart = async () => {
    try {
      const res = await axios.get("https://food-delivery-react-1.onrender.com/api/clear-cart");
      const data = res.data;
      toast.success(data.message);
      // Redirect to home page after clearing the cart and showing success
      setTimeout(() => {
        navigate("/"); // Redirect to the home page
      }, 2000); // Delay the redirect by 2 seconds
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <PropagateLoader color="#36d7b7" />
      ) : (
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Order Successful!
          </h2>
          <p>Your order has been successfully placed.</p>
        </div>
      )}
    </div>
  );
};

export default Success;
