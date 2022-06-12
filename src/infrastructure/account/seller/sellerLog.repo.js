// const SellerLog = require("./SellerLog");
import SellerLog from "./SellerLog";

const addToLog = async (log) => {
  try {
    console.log(log);
    await SellerLog.create({
      name: log.name,
      data: log.data,
      idEvent: log.idEvent,
    });
    return {
      isSuccess: true,
      message: "Register new successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      error: error.message || "Some error occurred while creating User!",
    };
  }
};

// module.exports = { addToLog };
export { addToLog };
