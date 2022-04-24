import crypto from "crypto";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
const crypt = {}
dotenv.config();

crypt.encryptedPassword = (password) => {
  const cipher = crypto.createCipheriv(algorithm, process.env.HESOYAM, process.env.GTA);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  var salt = bcrypt.genSaltSync(10);
  encrypted = bcrypt.hashSync(encrypted, salt);

  return encrypted;
};

const algorithm = process.env.ALGORITHM;
const iv = process.env.AANG;
const key = process.env.AVATAR;

crypt.encryptData = (str) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedData = cipher.update(str, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
};

crypt.decryptData = (str) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedData = decipher.update(str, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData
};

export default crypt