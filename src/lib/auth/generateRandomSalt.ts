import crypto from "crypto";

const generateRandomSalt = (): string => {
  return crypto.randomBytes(128).toString("base64");
};

export default generateRandomSalt;
