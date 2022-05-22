"use strict";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-.]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const salt = 10;

export const validPassword = async (password, hash) => {
  const res = await bcrypt.compare(password, hash);
  return res;
};

export const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const makeCode = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return token;
}
