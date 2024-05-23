import mongoose from "mongoose";

const ListeningSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    regularPrice: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      required: true,
    },

    bathroom: {
      type: Number,
      required: true,
    },

    bedRoom: {
      type: Number,
      required: true,
    },

    furnished: {
      type: Boolean,
      required: true,
    },

    parking: {
      type: Boolean,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    offer: {
      type: Boolean,
      required: true,
    },

    imageUrls: {
      type: Array,
      required: true,
    },

    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const  Listening = mongoose.model('LIstening', ListeningSchema);

export default Listening;