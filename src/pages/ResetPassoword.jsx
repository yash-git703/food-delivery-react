import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("http://localhost:5000/api/reset-password", {
        email,
      });
      const data = await res.data;
      if (data.success) {
        toast.success(data.message);
        navigate("/verify-otp");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
    className="flex justify-center items-center h-screen bg-cover bg-center"
    style={{
      backgroundImage: "url('https://img.freepik.com/premium-vector/design-web-pages-using-latin-american-cuisine-banner-website-advertisement_422344-3639.jpg?w=1060')", // Replace with your image URL
    }}
  >
      <form
        onSubmit={handleResetPassword}
        className="bg-white rounded-lg p-5 shadow-2xl flex flex-col gap-3 w-[80vw] lg:w-[23vw] text-sm"
      >
        <span className="text-lg text-gray-600 cursor-pointer -mb-1 text-center">
          Enter Your Email For Verification
        </span>
        <input
          type="email"
          name="email"
          id="email"
          className="outline-none border rounded-md px-3 py-2 focus:border-green-300 text-gray-600"
          autoComplete="off"
          placeholder="johndoe@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="outline-none border rounded-md px-3 py-2 text-white bg-green-500 hover:bg-green-300"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;