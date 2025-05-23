import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const logout = () => {
    navigate("/");
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => {
          navigate("/");
        }}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1 ">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctor">
          <li className="py-1 ">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 ">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 ">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      {/*.................................Profile Section.........................*/}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex itens-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointment")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/admin/adminlogin")}
              className="bg-black text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer"
            >
              Administrative
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-black text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer"
            >
              Create Account
            </button>
          </>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
        {/*--------------------------------------------------- mobile menu------------------------------------------*/}
        <div
          className={`${
            showMenu ? "fixed w-full h-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img
              onClick={() => {
                navigate("/");
                setShowMenu(false);
              }}
              className="w-36 cursor-pointer"
              src={assets.logo}
              alt="logo"
            />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="close"
            />
          </div>
          <ul className="flex flex-col items-center gap-3 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded cursor-pointer">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctor">
              <p className="px-4 py-2 rounded cursor-pointer">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded cursor-pointer">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded cursor-pointer">CONTACT</p>
            </NavLink>
            <button
              onClick={() => {
                navigate("/admin/adminlogin");
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 rounded text-black border border-gray-300 text-center"
            >
              Administrative
            </button>
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 rounded text-black border border-gray-300 text-center"
            >
              Create Account
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
