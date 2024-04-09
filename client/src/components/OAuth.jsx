/* eslint-disable react/prop-types */
// import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from "../Firebase.js";
import {useDispatch} from "react-redux"
import { signInSuccess } from "../Redux/User/UserSLice.js";
import {useNavigate} from "react-router-dom"
const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleCLick = async (e) => {
              e.preventDefault(); 
              try {
                 const Provider = new GoogleAuthProvider();

                 const Auth = getAuth(app);

                 const result = await signInWithPopup(Auth, Provider);

                 const res = await fetch("/api/auth/google", {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json',
                     },
                      
                     body:JSON.stringify({
                         name: result.user.displayName,
                         email: result.user.email,
                         photo: result.user.photoURL
                     })
                 })
               
                 const data = await res.json();
                 dispatch(signInSuccess(data));
                  setTimeout(() => {
                    navigate("/")
                  }, 3000);

              } catch (error) {
                  console.log("Couldn't Sign up with Google", error)
              }
    }
  return (
    <div>
        <button type="button" onClick={handleGoogleCLick} className="w-[300px] h-[40px] border-2 bg-slate-200 hover:bg-transparent cursor-pointer transition-all text-black font-semibold font-serif">Log In With Google</button>
    </div>
  )
}

export default OAuth
