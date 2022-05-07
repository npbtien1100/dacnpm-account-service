import cloudinary from "cloudinary";
import config from "./CloudinaryConfig";

class SaveHelper {
  constructor() {
    cloudinary.config(config);
  }

  saveImage(file) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        file,
        {
          resource_type: "image",
          chunk_size: 6000000,
          folder: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
  saveVideo(file) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        file,
        {
          resource_type: "video",
          folder: "video",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}

export default SaveHelper;
