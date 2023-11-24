const UserInfo = require("../models/collections/UserInfo");

const UserVerification = async (userData, res) => {
  try {
    const response = await UserInfo.findOne({
      email: userData?.email,
      password: userData?.password,
    });
    if (!response) {
      res.writeHead(404);
      res.end("Incorrect Cridentials!");
    } else {
      res.writeHead(200);
      res.end("Success!");
    }
  } catch (error) {
    res.writeHead(500);
    res.end();
  }
};

module.exports = { UserVerification };
