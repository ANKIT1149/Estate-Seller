import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },

    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
      toast.success("User Created SuccessFully");
    },

    signinFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateUserStart: (state) => {
      state.loading = true;
    },

    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },

    deleteuserStart: (state) => {
      state.loading = true;
    },

    deleuserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },

    signOutUserStart: (state) => {
      state.loading = true;
    },

    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signinFail,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserSuccess,
  deleteuserStart,
  deleuserFailure,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} = UserSlice.actions;

export default UserSlice.reducer;
