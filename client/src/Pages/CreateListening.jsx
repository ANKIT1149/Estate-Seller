// import React from 'react'

import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import { toast } from "react-toastify";

const CreateListening = () => {
  // Variable defined

  const { mode } = useContext(ThemeContext);
  const [files, setFiles] = useState([]);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  const [imageUploadError, setImageuploaderror] = useState(false);
  const [uploading, setUploading] = useState(false)
  // const ImageRef = useRef();

  //   variable defined end

  // Console Section

  console.log(filePerc);
  console.log(formData);

  //   upload image function

  const handleSubmitUpload = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true)
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImg(files[i]));
      }

      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });

        setImageuploaderror(toast.success('Image uploaded successfully'));
        setUploading(false)
      }).catch((err) => {
         setImageuploaderror(toast.error('Image upload failed'));
         setUploading(false)
      })
    } else{
       setImageuploaderror(toast.error('You can only upload 6 image per listening'));
       setUploading(false)
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

  const handleemoveImage  = (index) => {
     setFormData({...formData, imageUrls: formData.imageUrls.filter((_, i) => i !== index)})
  }
  return (
    <>
      <main className="p-3 max-w-4xl mx-auto">
        <h1
          className={`text-3xl font-semibold text-center my-7 ${
            mode === "light" ? "text-black" : "text-white"
          }`}
        >
          Create a Listing
        </h1>
        <form className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="62"
              minLength="10"
              required
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="description"
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              required
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5" />
                <span
                  className={`${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Sell
                </span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5" />
                <span
                  className={`${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Rent
                </span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="parking" className="w-5" />
                <span
                  className={`${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Parking spot
                </span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5" />
                <span
                  className={`${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Furnished
                </span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5" />
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
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
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
                {uploading ? 'Uploading... ' : 'Upload'}
              </button>
            </div>

            {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                <div className="flex justify-between border-2 p-3 items-center" key={index}>
                  <img src={url} alt="" className="w-20 h-20 object-contain"/>
                  <p className="text-red-800 text-lg hover:opacity-75 cursor-pointer font-semibold uppercase" onClick={() => handleemoveImage(index)}>Delete</p>
                </div>
            ))}
            <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              Create listing
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default CreateListening;
