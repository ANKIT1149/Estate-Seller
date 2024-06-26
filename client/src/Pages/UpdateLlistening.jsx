// import React from 'react'

import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateListening = () => {
  // Variable defined
  const { currentUser } = useSelector((state) => state.user);
  const { mode } = useContext(ThemeContext);
  const [files, setFiles] = useState([]);
  const [filePerc, setFilePerc] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const params = useParams();
  const [imageUploadError, setImageuploaderror] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const ImageRef = useRef();

  //   variable defined end

  // Console Section

  console.log(filePerc);
  console.log(formData);

  useEffect(() => {
    const fetchlisting = async () => {
      const listingId = params.listingId;
      console.log(listingId);
      const res = await fetch(`/api/listening/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
      console.log(data);
    };

    fetchlisting();
  }, []);

  //   upload image function

  const handleSubmitUpload = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImg(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });

          setImageuploaderror(toast.success("Image uploaded successfully"));
          setUploading(false);
        })
        .catch((err) => {
          setImageuploaderror(toast.error("Image upload failed"));
          setUploading(false);
        });
    } else {
      setImageuploaderror(
        toast.error("You can only upload 6 image per listening")
      );
      setUploading(false);
    }
  };

  //   store image in database function

  const storeImg = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
        },

        (error) => {
          reject(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handledatachanges = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }

    if (
      e.target.id === "furnished" ||
      e.target.id === "parking" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "text" ||
      e.target.type === "number" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");

      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");

      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listening/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          bedRoom: formData.bedrooms,
          bathroom: formData.bathrooms,
          imageUrls: formData.imageUrls,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listening/${params.listingId}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <main className="p-3 max-w-4xl mx-auto">
        <h1
          className={`text-3xl font-semibold text-center my-7 ${
            mode === "light" ? "text-black" : "text-white"
          }`}
        >
          Update Listening
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={handledatachanges}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="description"
              required
              onChange={handledatachanges}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              required
              onChange={handledatachanges}
              value={formData.address}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handledatachanges}
                  checked={formData.type === "sale"}
                />
                <span
                  className={`${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Sell
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handledatachanges}
                  checked={formData.type === "rent"}
                />
                <span
                  className={`${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Rent
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handledatachanges}
                  checked={formData.parking}
                />
                <span
                  className={`${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Parking spot
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  onChange={handledatachanges}
                  checked={formData.furnished}
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                />
                <span
                  className={`${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Furnished
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handledatachanges}
                  checked={formData.offer}
                />
                <span
                  className={`${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Offer
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handledatachanges}
                  value={formData.bedrooms}
                />
                <p
                  className={`${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Beds
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handledatachanges}
                  value={formData.bathrooms}
                />
                <p
                  className={`${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Baths
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handledatachanges}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p
                    className={`${
                      mode === "light" ? "text-black" : "text-white"
                    }`}
                  >
                    Regular price
                  </p>
                  <span
                    className={`text-xs ${
                      mode === "light" ? "text-black" : "text-white"
                    }`}
                  >
                    ($ / month)
                  </span>
                </div>
              </div>
              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="10000000"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                    onChange={handledatachanges}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p
                      className={` ${
                        mode === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      Discounted price
                    </p>
                    <span
                      className={`text-xs ${
                        mode === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      ($ / month)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className={`p-3 border border-gray-300 rounded w-full text-xs ${
                  mode === "light" ? "text-black" : "text-white"
                }`}
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                onClick={handleSubmitUpload}
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              >
                {uploading ? "Uploading... " : "Upload"}
              </button>
            </div>

            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  className="flex justify-between border-2 p-3 items-center"
                  key={index}
                >
                  <img src={url} alt="" className="w-20 h-20 object-contain" />
                  <p
                    className="text-red-800 text-lg hover:opacity-75 cursor-pointer font-semibold uppercase"
                    onClick={() => handleemoveImage(index)}
                  >
                    Delete
                  </p>
                </div>
              ))}
            <button
              disabled={loading || uploading}
              className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading ..." : "Edit-Listening"}
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>
      </main>
    </>
  );
};

export default UpdateListening;
