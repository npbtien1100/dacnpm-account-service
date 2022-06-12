"use-strict";

import bcrypt from "bcrypt";

export const slugify = (text) => text
  .toString()
  .toLowerCase()
  .replace(/\s+/g, "-") // Replace spaces with -
  .replace(/[^\w\-.]+/g, "") // Remove all non-word chars
  .replace(/--+/g, "-") // Replace multiple - with single -
  .replace(/^-+/, "") // Trim - from start of text
  .replace(/-+$/, "") // Trim - from end of text
;

const salt = 10;

export const validPassword = async (password, hash) => {
  const res = await bcrypt.compare(password, hash);
  return res;
};

export const hashPassword = async (password) => {
  console.log(password);
  return await bcrypt.hash(password, salt);
};

export const makeCode = (length = 30) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
