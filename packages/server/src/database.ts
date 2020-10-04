import { typedModel } from "ts-mongoose";
import LobbySchema from "./schemas/lobby";

const Lobby = typedModel('Lobby', LobbySchema);

export { Lobby };