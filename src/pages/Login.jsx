import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/AuthSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("https://food-delivery-react-1.onrender.com/api/login", {
      email,
      password,
    });
    const data = await res.data;

    if (res.status === 200) {
      dispatch(loginUser());
      toast.success(data.message);
      navigate("/");
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
        onSubmit={handleLogin}
        className="bg-white rounded-lg p-8 shadow-2xl flex flex-col gap-4 w-[90vw] lg:w-[30vw] text-sm z-10"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <input
          type="email"
          name="email"
          id="email"
          className="outline-none border rounded-md px-4 py-3 focus:border-green-300 text-gray-600"
          autoComplete="off"
          placeholder="johndoe@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          id="password"
          className="outline-none border rounded-md px-4 py-3 focus:border-green-300 text-gray-600"
          autoComplete="off"
          placeholder="********"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link
          to="/forgot-password"
          className="text-xs text-gray-600 hover:underline cursor-pointer mb-4"
        >
          Forgot Password?
        </Link>

        <button
          type="submit"
          className="outline-none border rounded-md px-4 py-3 text-white bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300 transition-all"
        >
          Login
        </button>

        <p className="text-xs text-gray-600 flex gap-2 mt-3">
          <span>Or</span>
          <Link to="/signup" className="hover:text-green-600">
            Create your account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
