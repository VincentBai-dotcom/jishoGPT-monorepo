import crypto from "crypto";

const generateRandomSalt = () => {
  crypto.randomBytes(128).toString("base64");
};

export default generateRandomSalt;
