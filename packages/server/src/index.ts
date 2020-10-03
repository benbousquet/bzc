import express from "express";
import http from "http";
import ioserver from "socket.io";

const app = express();
const server: http.Server = new http.Server(app);
const io: SocketIO.Server = ioserver(server);
const port = 3001;

io.on("connection", (socket) => {
  console.log("he joined :D");
  socket.on("disconnect", () => console.log("he left :("));
});

server.listen(port);
