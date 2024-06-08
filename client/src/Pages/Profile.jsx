/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect, useContext } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../Firebase";

import ThemeContext from "../context/ThemeContext";
import {
  deleteUserSuccess,
  deleteuserStart,
  deleuserFailure,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../Redux/User/UserSLice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  // variable defined

  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [erroloading, setLoading] = useState(false);
  const { mode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [userListings, setUserListings] = useState([]);

  const navigate = useNavigate();
  const [listingError, setListingError] = useState(false);
  // console.log(formData)
  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  // defined useefffect

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // Defined function of upload image in backend

  const handleFileUpload = (file) => {
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
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  // defined function of changes in form

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // define function of update the form

  const handleUpdation = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      toast.success("Updated profile page successfully");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      dispatch(updateUserFailure(error.mesage));
    }
  };

  // define function of delete theaccount

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteuserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleuserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
      toast.success("User deleted Successfuly");
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleuserFailure(error.message));
      toast.error("Account cannot be deleted");
    }
  };

  // defined the function of delete user

  const handleSignedoutUser = async (e) => {
    e.preventDefault();
    try {
      dispatch(signOutUserStart());

      const res = await fetch("/api/auth/signout");

      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      toast.success("User Signed Out SuccessFully");
      navigate("/sign-in");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
      toast.error("Sign out failed");
    }
  };

  const handleListing = async (e) => {
    e.preventDefault();
    try {
      setListingError(false);
      setLoading(true);

      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setFileUploadError(true);
        setLoading(false);
        toast.error("Showing Listings failed");
        return;
      }

      setFileUploadError(false);
      toast.success("Showing Listings Successfully");
      setLoading(false);
      setUserListings(data);
    } catch (error) {
      console.log(error);
      setListingError(true);
      setLoading(false);
      toast.error("Showing Listings failed");
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listening/delete/${listingId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        console.log(data.mesage);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.mesage);
    }
  };
  return (
    <div className="p-3 max-w-md mx-auto">
      <h1
        className={`text-3xl font-semibold text-center my-7 ${
          mode === "light" ? "text-black" : "text-white"
        }`}
      >
        Profile
      </h1>
      <form onSubmit={handleUpdation} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          onChange={handleChanges}
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg font-bold font-sans"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg font-bold font-sans"
          defaultValue={currentUser.email}
          onChange={handleChanges}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg font-bold font-sans"
          defaultValue={currentUser.password}
          onChange={handleChanges}
        />

        <input
          type="phone"
          placeholder="Phone"
          id="phone"
          className="border p-3 rounded-lg font-bold font-sans"
          defaultValue={currentUser.phone}
          onChange={handleChanges}
        />
        <button
          disabled={loading}
          className="bg-blue-800 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 font-serif font-bold"
        >
          {loading ? "Loading..." : "Update"}
        </button>

        <Link to="/create-listening" className="">
          <button className="bg-green-700 text-white font-serif font-bold rounded-lg mt-3 p-3 disabled:opacity-80 w-[430px]">
            Create Listening
          </button>
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span
          onClick={handleSignedoutUser}
          className="text-red-700 cursor-pointer"
        >
          Sign out
        </span>
      </div>
      <div className="flex justify-center items-center">
        <button
          type="button"
          disabled={loading}
          className="text-green-700 mt-2"
          onClick={handleListing}
        >
          {erroloading ? "Loading ..." : "Show Listings"}
        </button>
        <p className="text-red-800 text-sm mt-3">
          {fileUploadError ? "Error Showing Listening" : ""}
        </p>

        {userListings && userListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-center mt-7 text-2xl font-semibold">
              Your Listings
            </h1>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-3 flex justify-between items-center gap-4"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className="flex flex-col item-center">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-700 uppercase">Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
