import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const NavList = ({ toggleNav, setToggleNav, auth }) => {
  const handleLogout = async () => {
    try {
      const res = await axios.get("https://food-delivery-react-1.onrender.com/api/logout");
      // const data = await res.data; // Optional if you don't need to use data.message
      toast.success("You have successfully logged out!"); // Custom message
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };
  return (
    <div
      className={` ${
        !toggleNav && "translate-x-[200px]"
      } fixed top-14 right-5  md:mt-5 lg:right-8 p-3 w-fit bg-white bg-opacity-10 backdrop-blur-sm flex flex-col justify-center items-start rounded-lg shadow-md border border-white font-bold text-gray-600 transtion-all duration-500 ease-in-out z-50`}
    >
      {auth ? (
        <li onClick={handleLogout} className="hover:text-black select-none list-none">Logout</li>
      ) : (
        <div className="flex flex-col">
          <Link to="/login" className="hover:text-black select-none">
            Login{" "}
          </Link>
          <Link to="/signup" className="hover:text-black select-none">
            Signup{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavList;