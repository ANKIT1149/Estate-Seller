// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home, About, Profile, Signin,  Signup} from "../src/Pages/Index";
import {Header} from "../src/components/Index";
const App = () => {
  
  return (
    <BrowserRouter>
    <Header />
       <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/sign-in" element={<Signin />} />
           <Route path="/sign-up" element={<Signup />} />
           <Route path="/profile" element={<Profile />} />
           <Route path="/about" element={<About />} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
