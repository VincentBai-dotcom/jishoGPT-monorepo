import { timeStamp } from "console";
import mongoose, { model, Types } from "mongoose";

const Schema = mongoose.Schema;

export interface IUser {
  _id: string;
  email: string;
  username: string;
  authInfo?: {
    password: string;
    salt: string;
  };
  searchCredit: number;
  role: "user" | "admin";
  tier: "basicTier" | "starterTier" | "proTier";
  isSubscribed: boolean;
  starredWords: [Types.ObjectId];
  subscriptionEndDate?: Date;
  recentSearches: [string];
}

const UserSchema = new Schema<IUser>(
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
      },
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    tier: {
      type: String,
      default: "basicTier",
    },
    searchCredit: {
      type: Number,
      default: 1,
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

const User = mongoose.models.User || model<IUser>("User", UserSchema);

export default User;
