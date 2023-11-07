import crypto from "crypto";

export const hashPassword = (password: string, salt: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.HASH_SECRET || "LOCAL_SECRET")
    .digest("hex");
};

export default hashPassword;
