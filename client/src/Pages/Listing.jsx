// import React from 'react'

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { FaMapMarkerAlt, FaChair, FaParking, FaBath, FaBed, FaShare } from "react-icons/fa";
import "swiper/swiper-bundle.css";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import ThemeContext from "../context/ThemeContext";
const Listing = () => {
  SwiperCore.use([Navigation]);
  const [formData, setFormData] = useState(null);
  const {currentUser} = useSelector((state) => state.user)
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false)
  const params = useParams();
  const {mode} = useContext(ThemeContext);
  useEffect(() => {
    const fetchlisting = async () => {
      try {
        isLoading(true);
        setError(false);
        const listingId = params.listingId;
        console.log(listingId);
        const res = await fetch(`/api/listening/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          isLoading(false);
          setError(false);
          return;
        }
        setFormData(data);
        setError(false);
        isLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
      // console.log(data);
    };
    fetchlisting();
  }, [params.listingId]);

  console.log(formData);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading ....</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something Went Wrong ....</p>
      )}
      {formData && !loading && !error && (
        <div className="overflow-hidden">
          <Swiper navigation>
            {formData.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className={`text-2xl font-semibold ${mode === 'light' ? 'text-black' : 'text-white'}`}>
              {formData.name} - ${" "}
              {formData.offer
                ? formData.discountPrice.toLocaleString("en-US")
                : formData.regularPrice.toLocaleString("en-US")}
              {formData.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className={`text-green-700`} />
              {formData.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {formData.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {formData.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+formData.regularPrice - +formData.discountPrice} OFF
                </p>
              )}
            </div>
            <p className={`${mode === 'light' ? 'text-slate-800' : 'text-slate-200'} text-justify`}>
              <span className={`font-semibold ${mode === 'light' ? 'text-black' : 'text-white'}`}>Description - </span>
              {formData.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {formData.bedrooms > 1
                  ? `${formData.bedRoom} beds `
                  : `${formData.bedRoom} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {formData.bathroom > 1
                  ? `${formData.bathroom} baths `
                  : `${formData.bathroom} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {formData.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {formData.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {currentUser._id && !contact && formData.userRef  !== currentUser._id && (
               <button type="button" onClick={() => setContact(true)} className="bg-slate-800 p-3 mt-2 text-white uppercase font-bold font-serif rounded-lg">Contact Landlord</button>
            )}

            {contact && <Contact formData = {formData}/>}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
