// import React from 'react'

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import Listing from "./Listing";
import Listingitem from "../components/Listingitem";

const Home = () => {
  const [offerListing, setOfferListing] = useState([]);
  const [rentListings, setrentListings] = useState([]);
  const [saleListings, setsaleListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listening/get?offer=true&limit=6");
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        setOfferListing(data);
        fetchrentListing();
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();

    const fetchrentListing = async () => {
      try {
        const res = await fetch("/api/listening/get?type=rent&limit=6");
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        setrentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listening/get?type=sale&limit=6");
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        setsaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <>
      <div>
        {/* top */}
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
            Find your next <span className="text-slate-500">perfect</span>
            <br />
            place with ease
          </h1>
          <div className="text-gray-400 text-xs sm:text-sm">
            Sahand Estate is the best place to find your next perfect place to
            live.
            <br />
            We have a wide range of properties for you to choose from.
          </div>
          <Link
            to={"/search"}
            className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          >
            Lets get started...
          </Link>

          <h1>{offerListing.name}</h1>
        </div>
      </div>

      {/* SWiper Slide */}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                style={{
                  background: `url(${item.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={item._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* OFFER */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListing.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
