import { timeStamp } from "console";
import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    authInfo: {
      type: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
        sessionToken: { type: String, select: false },
      },
      required: true,
    },
    userType: {
      type: String,
      default: "normal",
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    subscriptionEndDate: {
      type: Date,
    },
    starredWords: [
      {
        type: Schema.Types.ObjectId,
        ref: "WordEntry",
      },
    ],
    recentSearches: [
      {
        type: String,
      },
    ], // Will be used later
  },
  { timestamps: true }
);

const User = mongoose.models.User || model("User", UserSchema);

export default User;
