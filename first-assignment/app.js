const http = require("http");
const { brotliDecompress } = require("zlib");

const users = [
  { name: "Aaron", age: 23 },
  { name: "Tina", age: 25 },
  { name: "Nilu", age: 31 },
];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    res.write(`<html>
    <head>
    <title>First Assignment</title>
    </head>
    <body>
    <h1>Welcome to the user database</h1>
    <form action="/new-user" method="POST">
    <label for="username">Username</label>
    <input type="text" name="username"/>
    <label for="age">Age</label>
    <input type="number" name="age"/>
    <button type="submit">Add User</button>
    </form>
    </body>
    </html>
    `);
    return res.end();
  }

  if (url === "/users" && method === "GET") {
    let users_string = "<ul>";

    for (const user of users) {
      users_string += `<li>${user.name}, ${user.age}</li>`;
    }
    users_string += "</ul>";

    res.write(`
      <html>
      <head>
      <title>Users Database</title>
      </head>
      <body>
      <h1>User Database</h1>
      ${users_string}
      </body>
      </html>
    `);
    return res.end();
  }

  if (url === "/new-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const data = parsedBody.split("&");
      users.push({ name: data[0].split("=")[1], age: data[1].split("=")[1] });
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      res.end();
    });
  }
});

server.listen(3000);
