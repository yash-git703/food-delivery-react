import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import NavList from "./NavList";
import axios from "axios";
import { loginUser, setUser } from "../redux/slices/AuthSlice";
import { getCart } from "../helper";
import { setCart } from "../redux/slices/CartSlice";

axios.defaults.withCredentials = true;

const Navbar = () => {
  const dispatch = useDispatch();
  const [toggleNav, setToggleNav] = useState(false);

  const auth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  const getUser = async () => {
    const res = await axios.get('http://localhost:5000/api/get-user', {
      withCredentials: true,
      headers: {
        'Referrer-Policy': 'no-referrer-when-downgrade' // Use for testing only
      }
    });
    const data = await res.data;
    dispatch(setUser(data.user));
    dispatch(loginUser());
  };

  getCart(user).then((data) => dispatch(setCart(data.cartItems)));

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav
      className="relative flex flex-col lg:flex-row justify-between py-6  px-6 mx-6 mb-10 bg-cover bg-center "
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-photo/flat-lay-composition-pasta-with-copyspace_23-2148189938.jpg?ga=GA1.1.1268874209.1722447087&semt=ais_hybrid')", // Replace with your image URL
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-700 opacity-60 z-0" />
      
      {/* Branding Section */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white">
          {new Date().toUTCString().slice(0, 16)}
        </h3>
        <h1 className="text-4xl font-bold text-white mt-2 drop-shadow-lg">
          Flavoro Foods
        </h1>
      </div>

      {/* Search Bar Section */}
      <div className="relative z-10 mt-4 lg:mt-">
        <input
          type="search"
          name="search"
          id=""
          placeholder="Search here"
          autoComplete="off"
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="p-3 pl-10 border border-gray-400 text-sm rounded-lg outline-none w-full lg:w-[25vw]"
        />
        <GiHamburgerMenu
          className={`absolute right-7 bottom-3 transform -translate-y-1/2 text-2xl text-gray-600 cursor-pointer md:p2 ${
            toggleNav && "hidden"
          } transition-all ease-in-out duration-500`}
          onClick={() => setToggleNav(true)}
        />
      </div>

      {/* Close Button */}
      <MdClose
        className={`absolute top-12 right-14 text-2xl cursor-pointer text-gray-400 ${
          !toggleNav && "hidden"
        } transition-all duration-500 z-20`}
        onClick={() => setToggleNav(false)}
      />

      {/* Navbar Links */}
      <NavList toggleNav={toggleNav} setToggleNav={setToggleNav} auth={auth} />
    </nav>
  );
};

export default Navbar;
