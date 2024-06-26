// import React from 'react'

// import { data } from "autoprefixer";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signinFail } from "../Redux/User/UserSLice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const {error, loading} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const SubmitForm = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
       dispatch(signinFail(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (error) {
      dispatch(signinFail(error.message));
    }
  };

  return (
    <div className="p-0 overflow-y-hidden mx-auto w-[100%] h-screen max-sm:h-auto">
      <div className="flex justify-center items-center gap-0 w-[100%] overflow-y-hidden max-sm:flex-col">
        <div className="w-[30%] h-screen bg-white flex-wrap flex flex-col max-sm:w-[100%]">
             <div className="flex gap-4 justify-center items-center bg-white mt-16">
             <img src="https://tse1.mm.bing.net/th?id=OIP.QF5nHGUBhZi77Kvi3iEzIwHaHa&pid=Api&P=0&h=180" alt="" className=" cursor-pointer mix-blend-multiply  border-none outline-none bg-none w-[50px]"/>
             <h1 className="font-bold font-serif capitalize text-black">Realtor Estate</h1>
             </div>
             <h1 className="p-4 mt-8 text-2xl font-serif font-bold leading-relaxed text-green-600 text-center max-sm:p-0">Welcome Back !</h1>
             <p className="mx-14 text-justify font-bold max-sm:mx-auto max-sm:text-center max-sm:mt-5">We provide best house in affordable prices.Here register your account and explore houses. We provide also listening option to user so you can also post the listening to sell the houses.</p>
             <div className="flex items-center justify-center mt-[30px]">
                 <div className="w-[40px] h-[40px] border-2 border-green-600 bg-green-700 flex justify-center items-center">
                    <FcGoogle size={30}/> 
                 </div>
             <OAuth />
             </div>
            <p className="mx-[60px] mt-4 font-bold">or</p>
            <div className="flex items-center justify-center mt-[10px]">
                 <div className="w-[40px] h-[40px] border-2 border-green-600 bg-green-700 flex justify-center items-center">
                    <img src="https://tse1.mm.bing.net/th?id=OIP.TW21b-CFGudjWw39HNhqcgHaEK&pid=Api&rs=1&c=1&qlt=95&w=211&h=118" alt="" className=" mix-blend-multiply"/>
                 </div>
                 <button type="submit" className="w-[300px] h-[40px] border-2 bg-slate-200 hover:bg-transparent cursor-pointer transition-all text-black font-semibold font-serif">Log In With Email Address</button>
             </div>
             <img src="https://tse2.mm.bing.net/th?id=OIP.PX82I-JuVKn_PhAvtGrLKAHaKl&pid=Api&P=0&h=180" alt="" className="w-[100px] mx-14 h-[150px] mt-5"/>
        </div>
        <div className="flex justify-center items-center  w-[70%] max-sm:w-[100%] h-screen bg-green-900 relative">
            <img src="https://t4.ftcdn.net/jpg/00/52/00/63/240_F_52006357_4yO0IU7nJ4bqShErgOCfO9kGFqko4C6y.jpg" alt="" className="mix-blend-multiply rotate-[180deg] transform w-[300px] absolute top-[250px] right-[0px]"/>
            <img src="https://t4.ftcdn.net/jpg/00/52/00/63/240_F_52006357_4yO0IU7nJ4bqShErgOCfO9kGFqko4C6y.jpg" alt="" className="mix-blend-multiply rotate-[360deg] transform w-[300px] absolute top-[0px] left-[0px]"/>
            <div className='w-[500px] h-[400px] border-2 layer rounded-tl-xl rounded-tr-3xl rounded-br-2xl z-50 shadow-md shadow-white flex justify-center items-center flex-col'>
               <h1 className=" font-bold font-serif text-white">Login Into Your Account</h1>
               <form onSubmit={SubmitForm} action="" className="flex flex-col gap-4 mt-[40px]">
         <label htmlFor="email" className="font-bold font-sans text-white">Your Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder=""
          className="border p-2 rounded-l-2xl rounded-tr-3xl w-[300px] font-serif font-semibold text-black outline-none"
          onChange={HandleChanges}
        />
          <label htmlFor="password" className="font-bold font-sans text-white">Your Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder=""
          className="border p-2 rounded-l-2xl rounded-tr-3xl w-[300px] font-serif font-semibold text-black outline-none"
          onChange={HandleChanges}
        />
        <button disabled={loading} className="bg-green-600 mt-5 text-white p-3 w-[300px] uppercase hover:opacity-95 disabled:opacity-80 font-serif font-bold focus:bg-transparent focus:border-green-600 focus:border-2 rounded-l-2xl rounded-tr-3xl">
         {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="text-black font-bold">Do not Have an Account ?</p>
        <Link to="/sign-up" className="text-white">
          Sign Up
        </Link>
      </div>
      {error && <p>{error}</p>}
            </div>
        </div>
      </div>
     
    </div>
  );
};

export default Signin;
