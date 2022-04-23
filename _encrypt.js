import crypto from "crypto";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const encryptedPassword = (password) => {
  const cipher = crypto.createCipheriv(algorithm, process.env.HESOYAM, process.env.GTA);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  console.log("before bcrypt : ", encrypted);
  var salt = bcrypt.genSaltSync(10);
  encrypted = bcrypt.hashSync(encrypted, salt);

  return encrypted;
};

const algorithm = process.env.ALGORITHM;
const iv = process.env.AANG;
const key = process.env.AVATAR;
const cipher = crypto.createCipheriv(algorithm, key, iv);
const decipher = crypto.createDecipheriv(algorithm, key, iv);

const encrypt = (str) => {
  let encryptedData = cipher.update(str, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
};

const decrypt = (str) => {
  let decryptedData = decipher.update(str, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData
};
