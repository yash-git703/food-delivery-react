import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await axios.post(`http://localhost:5000/api/signup`, {
      name,
      email,
      password,
    });
    const data = await res.data;
    if (res.status === 201) {
      toast.success(data.message);
      navigate("/login");
    } else if (res.status === 400 || res.status === 500) {
      toast.error(data.message);
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
        onSubmit={handleSignup}
        className="bg-white rounded-lg p-8   shadow-2xl flex flex-col gap-4 w-[90vw] lg:w-[30vw] z-10"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <input
          type="text"
          name="name"
          id="name"
          className="outline-none border rounded-md px-4 py-3 focus:border-green-300 text-gray-600"
          autoComplete="off"
          placeholder="John Doe"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button
          type="submit"
          className="outline-none border rounded-md px-4 py-3 text-white bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300 transition-all"
        >
          Signup
        </button>

        <p className="text-xs text-gray-600 flex gap-2 mt-3">
          <span>Already have an account?</span>
          <Link to="/login" className="hover:text-green-600">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
