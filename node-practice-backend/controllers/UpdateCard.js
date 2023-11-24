const Cards = require("../models/collections/Cards");

const UpdateCard = async (updatedData, res) => {
  try {
    const response = await Cards.findOneAndUpdate(
      { id: updatedData?.id },
      { title: updatedData?.title, description: updatedData?.description }
    );
    res.writeHead(201);
    res.end("Created!");
  } catch (error) {
    res.writeHead(500);
    res.end("Server error!");
  }
};

module.exports = { UpdateCard };
