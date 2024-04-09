import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    phone: {
         type: String,
         required: true,
    },

   avatar: {
     type: String,
     default: "https://lh3.googleusercontent.com/a/ACg8ocL84YopSLCrbWZQXbuEx-o5zIdLo3QEszYm3yfjrQddfK1-iQ=s96-c",
   }    
} , {timestamps: true})

const User = mongoose.model("User", UserSchema);

export default User;