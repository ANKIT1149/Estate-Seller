import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
const initialState = {
     currentUser: null,
     error: null,
     loading: false,
}

const UserSlice = createSlice({
     name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
               state.loading = true
        },

        signInSuccess : (state, action) => {
             state.currentUser = action.payload;
             state.error = null;
             state.loading = false;
             toast.success("User Created SuccessFully")
        },

        signinFail : (state, action) => {
             state.error = action.payload;
             state.loading = false;
        },

        updateUserFailure : (state, action) => {
          state.error = action.payload
          state.loading = false
        },

        updateUserStart : (state) => {
           state.loading = true
        },

        updateUserSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        }
    }

});

export const  {signInStart, signInSuccess, signinFail, updateUserFailure, updateUserStart, updateUserSuccess} = UserSlice.actions;

export default UserSlice.reducer;