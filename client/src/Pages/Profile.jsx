// import React from 'react'
import { useContext } from "react";
import {useSelector} from "react-redux";
import ThemeContext from "../context/ThemeContext";
const Profile = () => {
  const {mode} = useContext(ThemeContext);
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className="flex justify-center items-center flex-wrap p-4 mt-2 flex-col">
       <h1 className={`text-4xl font-bold capitalize ${mode === 'light' ? 'text-black' : 'text-white'}`}>Profile</h1>
       <form action="" className="flex gap-8 flex-col p-4">
          <img src={currentUser.avatar} alt="" className="self-center rounded-full"/>
            <input type="text" name="" id="username" placeholder="Username..." className="p-3 w-[400px] h-auto border-2 outline-none rounded-xl focus:border-green-800 transition-all font-bold font-serif capitalize"/>
            <input type="email" name="" id="email" placeholder="Email" className="p-3 w-[400px] h-auto border-2 outline-none rounded-xl focus:border-green-800 transition-all font-bold font-serif capitalize"/>
            <input type="password" name="" id="userpassword" placeholder="Password" className="p-3 w-[400px] h-auto border-2 outline-none rounded-xl focus:border-green-800 transition-all font-bold font-serif capitalize"/>
             <button type="submit" className="w-[400px] border-2 p-3 mx-auto border-blue-800 bg-blue-800 text-white font-bold text-xl rounded-xl font-serif">Update Account</button>
       </form>
       <div className="flex justify-between gap-[180px] items-center mt-2">
          <span className="text-red-700 font-semibold font-mono">Delete Account</span>
          <span className="text-blue-700 font-bold font-sans">Sign Out</span>
       </div>
    </div>
  )
}

export default Profile
