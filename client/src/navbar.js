import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./context/auth";
const Navbar = ({ onLogout }) => {
  const [auth, setAuth] = useState("");
  navigate = useNavigate();

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-row flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 "></div>
            </div>
          </div>
          <Link
            to={"/"}
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-large"
          >
            Home
          </Link>
          <Link
            to={"/signup"}
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-large"
          >
            Sign Up
          </Link>
          <Link
            to={"/login"}
            className="text-gray-300  hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-large"
          >
            Login
          </Link>
          <Link
            to={"/login"}
            className="text-gray-300  hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-large"
            onClick={() => {
              localStorage.removeItem("auth");
              if (onLogout) {
            onLogout(); 
          }
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
