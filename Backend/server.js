const http = require("http");
const app = require("./app");
const Port = process.env.PORT || 4000;


const server = http.createServer(app);

server.listen(Port, () => (
    console.log(`Server is running at http://localhost:${Port}`)
))