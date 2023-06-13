import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.jpg";

const NavBar = () => {
  return (
    <div className="w-[250px] min-h-screen shadow-2xl p-4">
      <div className="flex flex-col items-center justify-center mb-10 space-y-5">
        <img src={Logo} alt="Logo" />
        <div className="text-xl text-[#00136A] font-bold">Technical Test</div>
      </div>
      <div className="flex flex-col space-y-4">
        <NavLink
          className={({ isActive }) =>
            `flex items-center px-4 h-[50px] rounded-xl ${
              isActive ? "bg-blue-600 text-white font-semibold" : "bg-gray-200"
            }`
          }
          to={"/"}
        >
          Problem 1
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center px-4 h-[50px] rounded-xl ${
              isActive ? "bg-blue-600 text-white font-semibold" : "bg-gray-200"
            }`
          }
          to={"/problem-2"}
        >
          Problem 2
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
