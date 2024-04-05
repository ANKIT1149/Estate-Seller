/* eslint-disable no-constant-condition */
// import React from 'react'
import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { FiSun } from "react-icons/fi";
import { BsFillCloudSunFill } from "react-icons/bs";
const Header = () => {
  // console.log("Hello World")
  const { mode, toggleMode } = useContext(ThemeContext);
  return (
    <header className={`shadow-lg ${mode === 'light' ? "bg-slate-300" : 'bg-black'} shadow-white `}>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className={`${mode === 'light' ? 'text-slate-500' : 'text-white'}`}>Aryansh</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className=" bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className={`bg-transparent outline-none w-24 sm:w-64 `}
          />
          <div className={`flex justify-center items-center w-[30px] h-[30px] ${mode === 'dark' ? ' border-2 rounded-full border-red-800 bg-red-800': ''}`}>
          <FaSearch className={`${mode === 'dark' ? 'text-white' : 'text-slate-600'}`} />
          </div>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="font-bold font-serif hidden sm:inline text-slate-700 hover:underline cursor-pointer">
            <NavLink
                    to="/"
                    // onClick={() => {menuClose(false)}}
                    className={({ isActive }) =>
                      ` font-bold font-serif capitalize leading-normal ${
                        mode === 'light' ? (isActive ? 'text-green-700' : 'text-black') : (isActive ? 'text-green-700' : 'text-white')
                      } text-xl `
                    }
                  >
                   Home
                  </NavLink>
            </li>
          </Link>
          <Link to="/about">
            <li className="font-serif font-bold hidden sm:inline text-slate-700 hover:underline cursor-pointer">
            <NavLink
                    to="/about"
                    // onClick={() => {menuClose(false)}}
                    className={({ isActive }) =>
                    ` font-bold font-serif capitalize leading-normal ${
                      mode === 'light' ? (isActive ? 'text-green-700' : 'text-black') : (isActive ? 'text-green-700' : 'text-white')
                    } text-xl `
                  }
                  >
                  About
                  </NavLink>
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="font-serif font-bold text-slate-700 hover:underline cursor-pointer">
            <NavLink
                    to="/sign-in"
                    // onClick={() => {menuClose(false)}}
                    className={({ isActive }) =>
                    ` font-bold font-serif capitalize leading-normal ${
                      mode === 'light' ? (isActive ? 'text-green-700' : 'text-black') : (isActive ? 'text-green-700' : 'text-white')
                    } text-xl `
                  }
                  >
                  Sign In
                  </NavLink>
          
            </li>
          </Link>
          <button
            onClick={toggleMode}
            className="ml-3"
            title={mode === "light" ? "Dark mode" : "Light Mode"}
          >
            {mode === "light" ? (
              <FiSun size={20}/>
            ) : "dark" ? (
              <BsFillCloudSunFill size={20} className="text-white" />
            ) : (
              ""
            )}
          </button>
        </ul>
      </div>
    </header>
  );
};

export default Header;
