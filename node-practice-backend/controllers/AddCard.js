const Cards = require("../models/collections/Cards");
const { getNextNumber } = require("../models/middlewares/GetNextNumber");

const addCard = (formData, res) => {
  try {
    getNextNumber(async (newID) => {
      formData.id = newID;
      await Cards.create(formData);
    });
    res.writeHead(201);
    res.end("Success!");
  } catch (err) {
    res.writeHead(500);
    res.end();
  }
};

module.exports = { addCard };
