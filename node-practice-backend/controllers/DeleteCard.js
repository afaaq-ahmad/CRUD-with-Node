const Cards = require("../models/collections/Cards");

const DeleteCard = async (ID, res) => {
  try {
    const delRes = await Cards.deleteOne({ id: ID });
    if (delRes?.deletedCount === 0) {
      res.writeHead(404);
      return res.end("No card found!");
    }
    res.writeHead(200);
    res.end("Success!");
  } catch (error) {
    res.writeHead(500);
    res.end("Server error!");
  }
};

module.exports = { DeleteCard };
