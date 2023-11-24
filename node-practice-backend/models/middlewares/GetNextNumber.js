const Counters = require("../collections/Counters");
const Cards = require("../collections/Cards");

const getNextNumber = async (callback) => {
  try {
    const cards = await Cards.find();
    if (cards.length === 0) {
      await Counters.findByIdAndUpdate("cardID", {
        sequence: 2,
      });
      callback(1);
    } else {
      const current = await Counters.findById("cardID").select("-_id");
      await Counters.findByIdAndUpdate("cardID", {
        sequence: current.sequence + 1,
      });
      callback(current.sequence);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { getNextNumber };
