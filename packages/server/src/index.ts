import express from "express";
import http from "http";
import ioserver from "socket.io";

require("dotenv").config();

const app = express();
const server: http.Server = new http.Server(app);
const socketServer: SocketIO.Server = ioserver(server);
const port = 3001;

socketServer.on("connection", (socket) => {
  console.log("he joined :D");

  socket.emit("newMessage", "New person Joined");

  socket.on("sendMessage", (message) => {
    console.log("someone has said something: " + message);
    socketServer.emit("newMessage", message);
  });
  socket.on("disconnect", () => console.log("he left :("));
});

server.listen(port);
