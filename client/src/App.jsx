// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home, About, Profile, Signin,  Signup} from "../src/Pages/Index";
import {Header} from "../src/components/Index";
import ThemeProvider from "./context/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"
const App = () => {
  
  return (
    <ThemeProvider>
    <BrowserRouter>
    <Header />
       <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/sign-in" element={<Signin />} />
           <Route path="/sign-up" element={<Signup />} />
           <Route path="/profile" element={<Profile />} />
           <Route path="/about" element={<About />} />
       </Routes>
       <ToastContainer />
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
