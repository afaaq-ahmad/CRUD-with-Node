const UserInfo = require("../models/collections/UserInfo");
const postSignUpData = async (userData, res) => {
  try {
    await UserInfo.create(userData);
    res.writeHead(201);
    res.end("Success");
  } catch (error) {
    if (error.code === 11000) {
      res.writeHead(404);
      res.end(`User with ${error.keyValue.email} already exist!`);
    } else {
      res.writeHead(500);
      res.end("Network Error!");
    }
  }
};

module.exports = { postSignUpData };
