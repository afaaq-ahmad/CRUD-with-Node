const http = require("http");
const url = require("url");
const connectDB = require("./database/connect");
const { postSignUpData } = require("./controllers/postSignUpData");
const { UserVerification } = require("./controllers/LoginVerify");
const { parseData } = require("./common/parsePostRequest");
const { addCard } = require("./controllers/AddCard");
const { getCards } = require("./controllers/GetCards");
const { DeleteCard } = require("./controllers/DeleteCard");
const { UpdateCard } = require("./controllers/UpdateCard");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // const parsedUrl = url.parse(req.url, true);
  // const path = parsedUrl.pathname;
  // const id = path?.slice(path?.lastIndexOf("/") + 1, path?.length - 1);
  // const UrlArr = path?.split("/");

  // console.log("id: ", UrlArr);
  // console.log("parsedURL: ", parsedUrl);
  // console.log("path: ", path);
  // console.log("url: ", UrlArr[UrlArr?.length - 2]);

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }
  // if (path === "/route1") {
  //   res.writeHead(200, { "Content-Type": "text/plain" });
  //   res.end("This is route 1");
  // } else if (path === "/route2") {
  //   res.writeHead(200, { "Content-Type": "text/plain" });
  //   res.end("This is route 2");
  // } else {
  //   res.writeHead(404, { "Content-Type": "text/plain" });
  //   res.end("Not Found");
  // }

  if (req.url === "/userdata" && req.method === "POST") {
    parseData(req, (error, parsedData) => {
      if (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ success: false, error: "Invalid JSON" })
        );
      } else {
        postSignUpData(parsedData, res);
      }
    });
  } else if (req.url === "/loginverify" && req.method === "POST") {
    parseData(req, (error, parsedData) => {
      if (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ success: false, error: "Invalid JSON" })
        );
      } else {
        UserVerification(parsedData, res);
      }
    });
  } else if (req.url === "/addcard" && req.method === "POST") {
    parseData(req, (error, parsedData) => {
      if (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ success: false, error: "Invalid JSON" })
        );
      } else {
        addCard(parsedData, res);
      }
    });
  } else if (req.url === "/deletecard" && req.method === "DELETE") {
    parseData(req, (error, parsedData) => {
      if (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ success: false, error: "Invalid JSON" })
        );
      } else {
        DeleteCard(parsedData.ID, res);
      }
    });
  } else if (req.url === "/getcards" && req.method === "GET") {
    getCards(res);
  }
  // else if (
  //   req.url === `/${UrlArr[UrlArr?.length - 2]}` &&
  //   req.method === "GET"
  // ) {
  //   console.log("id in backend", req.url);
  //   res.writeHead(200);
  //   return res.end("done");
  //   // getCards(res);
  // }
  else if (req.url === `/updatecard` && req.method === "PUT") {
    parseData(req, (error, parsedData) => {
      if (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ success: false, error: "Invalid JSON" })
        );
      } else {
        UpdateCard(parsedData, res);
      }
    });
  }
});

const goLive = async () => {
  try {
    const connected = await connectDB()
      .then(() => {
        server.listen(3005, () => {
          console.log("Server is listening at 3005");
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  } catch (error) {
    console.log("Error: ", error);
  }
};

goLive();
