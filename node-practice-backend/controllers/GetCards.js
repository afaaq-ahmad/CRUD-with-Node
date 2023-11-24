const Cards = require("../models/collections/Cards");

const getCards = async (res) => {
  try {
    const fetchCards = await Cards.find();

    if (fetchCards.length === 0) {
      res.writeHead(404);
      return res.end("No card found!");
    }

    res.writeHead(200);
    res.end(
      JSON.stringify({
        data: [...fetchCards],
        message: `${fetchCards.length} cards found!`,
      })
    );
  } catch (err) {
    res.writeHead(500);
    res.end("Server Error!");
  }
};

module.exports = { getCards };
