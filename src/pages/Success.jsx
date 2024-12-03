import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { useNavigate } from "react-router-dom"; // Import useNavigate
axios.defaults.withCredentials = true;

const Success = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3-second loader
  }, []);

  const clearCart = async () => {
    try {
      const res = await axios.get("https://food-delivery-react-1.onrender.com/api/clear-cart");
      const data = res.data;
      toast.success(data.message);
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error("Failed to clear the cart.");
    }
  };

  useEffect(() => {
    clearCart();
  }, []);

  // Redirect to home page after loader finishes
  useEffect(() => {
    if (!loading) {
      navigate("/"); // Redirect to the home page
    }
  }, [loading, navigate]);

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
