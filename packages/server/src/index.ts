import express from "express";
import http from "http";
import ioserver from "socket.io";
import { Lobby } from "./database";
import mongoose from "mongoose";
import crypto from "crypto-random-string";

require("dotenv").config();

const app = express();
const server: http.Server = new http.Server(app);
const socketServer: SocketIO.Server = ioserver(server);
const port = 3001;
mongoose.connect('mongodb+srv://admin:admin@bzc.phqzg.mongodb.net/bzc?retryWrites=true&w=majority');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database connected');
});

socketServer.on("connection", (socket) => {
  console.log("he joined :D");

  socket.emit("newMessage", "New person Joined");

  socket.on("createLobby", (username) => {
    // generate lobby code and message
    let lobbyCode = crypto({ length: 5, type: 'distinguishable' });
    let message = crypto({ length: 50, type: 'distinguishable' });
    // create lobby
    let newLobby = new Lobby({ code: lobbyCode, scores: [{ username, score: 0 }], message });
    newLobby.save((_err, _lobby) => {
      console.log("Created new lobby with code: " + lobbyCode);
    })
  })

  socket.on("sendMessage", (message) => {
    console.log("someone has said something: " + message);
    socketServer.emit("newMessage", message);
  });
  socket.on("disconnect", () => console.log("he left :("));
});

server.listen(port);
