// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, About, Profile, Signin, Signup } from "../src/Pages/Index";
import { Header } from "../src/components/Index";
import ThemeProvider from "./context/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import CreateListening from "./Pages/CreateListening";
import UpdateListening from "./Pages/UpdateLlistening";
import Listing from "./Pages/Listing.jsx";
import Searchlistening from "./Pages/Searchlistening.jsx";
// import Search from "./Pages/SEarch.jsx";
// import { useSelector } from "react-redux";
const App = () => {
  // const {currentUser} = useSelector((state) => state.user)
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/listening/:listingId" element={<Listing />} />
          <Route path="/search" element={<Searchlistening />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-Listening" element={<CreateListening />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListening />}
            />
          </Route>
          <Route path="/about" element={<About />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
