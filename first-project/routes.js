const fs = require("fs");

export const requestHandler = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<html><body><form action='/message' method='POST'><input name='message'></input><button type='submit'>Send</button></form></body></html>"
    );
    return res.end();
  }

  if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>My first NodeJS server</title></head><body><h1>Welcome to my first NodeJS server</h1></body></html>"
  );
  res.end();
};
