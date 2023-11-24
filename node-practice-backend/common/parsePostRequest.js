const parseData = (req, callback) => {
  const chunks = [];
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });
  req.on("end", () => {
    const data = Buffer.concat(chunks);
    try {
      const parsedData = JSON.parse(data.toString());
      console.log(JSON.parse(data.toString()));
      callback(null, parsedData);
    } catch (error) {
      callback(error);
    }
  });
};

module.exports = { parseData };
