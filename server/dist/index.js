"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const formatGameForClient_1 = __importDefault(require("./util/formatGameForClient"));
const MultiplayerLobby_1 = __importDefault(require("./classes/MultiplayerLobby"));
const PrivateLobby_1 = __importDefault(require("./classes/PrivateLobby"));
const GamesManager_1 = __importDefault(require("./classes/GamesManager"));
const path_1 = __importDefault(require("path"));
// set up server
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const config = process.env.NODE_ENV === "production"
    ? {}
    : {
        cors: {
            origin: "http://localhost:5173",
        },
    };
const io = new socket_io_1.Server(server, config);
const port = process.env.PORT || 3000;
const clientBuildPath = "../../client/dist";
// set variables
const gamesManager = new GamesManager_1.default();
const multiplayerLobby = new MultiplayerLobby_1.default();
const privateLobby = new PrivateLobby_1.default();
/**
 * Send game update to both players in a game based on one of the player's ids
 * @param knownID of player
 */
function sendGameUpdate(knownID) {
    if (!gamesManager.getGame(knownID)) {
        return;
    }
    io.to(knownID).emit("update-game", (0, formatGameForClient_1.default)(gamesManager.getGame(knownID).game, knownID));
    io.to(gamesManager.getOpponentID(knownID)).emit("update-game", (0, formatGameForClient_1.default)(gamesManager.getGame(knownID).game, gamesManager.getOpponentID(knownID)));
}
/**
 * Register listeners for game actions
 * play-card, stand, end-turn, get-cpu-turn
 * @param socket related socket
 */
function registerGameActions(socket) {
    /**
     * Play card in socket's active game
     * @param playOnSelf whether card is being played on self or opponent
     * @param cardID id of card (relative to player's playable cards)
     */
    socket.on("play-card", ({ playOnSelf, cardID }) => {
        // get player id
        const playerID = socket.id;
        // play
        gamesManager.playCard(playerID, playOnSelf, cardID);
        // update
        sendGameUpdate(playerID);
    });
    /**
     * End sockets's turn in active game
     */
    socket.on("end-turn", () => {
        // get player id
        const playerID = socket.id;
        // end turn
        gamesManager.endTurn(playerID);
        // update
        sendGameUpdate(playerID);
    });
    /**
     * Set socket to stand in active game
     */
    socket.on("stand", () => {
        // get player id
        const playerID = socket.id;
        // stand
        gamesManager.setStand(playerID);
        // update
        sendGameUpdate(playerID);
    });
    /**
     * Get cpu turn in socket's active game
     * For single player games, client must request the cpu's turn in order to move the game forward
     */
    socket.on("get-cpu-turn", () => {
        // get player id
        const playerID = socket.id;
        // do turn
        const success = gamesManager.doCPUTurn(playerID);
        if (!success) {
            sendGameUpdate(playerID);
        }
        // update
        sendGameUpdate(playerID);
    });
}
/**
 * Register multiplayer lobby actions
 * find-multiplayer-game, confirmed-multiplayer-join
 * @param socket related socket
 */
function registerMultiplayerLobbyActions(socket) {
    /**
     * Add socket to queue for multiplayer game
     * Process queue by adding first two queued players to pendingConfirmations
     */
    socket.on("find-multiplayer-game", () => {
        multiplayerLobby.queuePlayer(socket.id);
        const matchedPlayers = multiplayerLobby.matchPlayers();
        // send confirmation
        for (let i = 0; i < matchedPlayers.length; i++) {
            io.to(matchedPlayers[i]).emit("game-found");
        }
        // set timeout for response
        setTimeout(() => {
            // if don't exist, do nothing
            if (!multiplayerLobby.getPendingConfirmation(matchedPlayers[0]) ||
                !multiplayerLobby.getPendingConfirmation(matchedPlayers[1])) {
                return;
            }
            // if both confirmed, do nothing
            if (multiplayerLobby.getPendingConfirmation(matchedPlayers[0])
                .confirmed &&
                multiplayerLobby.getPendingConfirmation(matchedPlayers[1])
                    .confirmed) {
                return;
            }
            // send messages
            for (let i = 0; i < matchedPlayers.length; i++) {
                if (multiplayerLobby.getPendingConfirmation(matchedPlayers[i])
                    .confirmed) {
                    io.to(matchedPlayers[i]).emit("join-failed", {
                        myFault: false,
                    });
                }
                else {
                    io.to(matchedPlayers[i]).emit("join-failed", {
                        myFault: true,
                    });
                }
            }
            // clean up
            multiplayerLobby.deletePendingConfirmation(matchedPlayers[0]);
        }, 10000);
    });
    /**
     * Confirm joining multiplayer game
     * If both players have confirmed, start the game
     */
    socket.on("confirmed-multiplayer-join", () => {
        // confirm
        multiplayerLobby.confirmMatch(socket.id);
        // check other confirmation
        if (!multiplayerLobby.getPendingConfirmation(socket.id).confirmed ||
            !multiplayerLobby.getOtherPendingConfirmation(socket.id).confirmed) {
            return;
        }
        // delete from pending
        const playerIDs = multiplayerLobby.deletePendingConfirmation(socket.id);
        if (playerIDs.length != 2) {
            return;
        }
        // create game
        gamesManager.initMultiplayerGame(playerIDs);
        // send game
        sendGameUpdate(playerIDs[0]);
    });
}
/**
 * Register singleplayer lobby actions
 * start-singleplayer-game
 * @param socket
 */
function registerSingleplayerLobbyActions(socket) {
    /**
     * Start singleplayer game
     */
    socket.on("start-singleplayer-game", () => {
        // set up game
        const playerID = socket.id;
        // start
        gamesManager.initSingleplayerGame(playerID);
        // send game object to player
        sendGameUpdate(playerID);
    });
}
/**
 * Register private lobby actions
 * request-to-host, stop-hosting, join-private-game
 * @param socket
 */
function registerPrivateLobbyActions(socket) {
    /**
     * Add socket to waitingHosts
     */
    socket.on("request-to-host", () => {
        privateLobby.addHost(socket.id);
    });
    /**
     * Remove socket from waitingHosts
     */
    socket.on("stop-hosting", () => {
        privateLobby.removeHost(socket.id);
    });
    /**
     * Join hosted game
     * @param hostID id of host
     * @param callback call with status of join, false indicates join was unsuccessful
     */
    socket.on("join-private-game", (hostID, callback) => {
        // join
        const joinSuccess = privateLobby.joinGame(socket.id, hostID);
        callback(joinSuccess);
        if (!joinSuccess) {
            return;
        }
        // set up game
        const playerIDs = [hostID, socket.id];
        // create game
        gamesManager.initMultiplayerGame(playerIDs);
        // send update
        sendGameUpdate(playerIDs[0]);
    });
}
// set up listeners
io.on("connection", (socket) => {
    // update user count
    const sockets = io.sockets.sockets;
    io.emit("update-num-users", sockets.size);
    // register listeners
    registerSingleplayerLobbyActions(socket);
    registerMultiplayerLobbyActions(socket);
    registerPrivateLobbyActions(socket);
    registerGameActions(socket);
    // clean up
    socket.on("disconnect", () => {
        io.emit("update-num-users", io.sockets.sockets.size);
        gamesManager.leaveAllGames(socket.id);
        sendGameUpdate(socket.id);
        multiplayerLobby.removePlayerFromQueue(socket.id);
        privateLobby.removeHost(socket.id);
        // pending joins? or just leave it and let the timeout take care of it
    });
});
// point routes towards client build
app.use(express_1.default.static(path_1.default.join(__dirname, clientBuildPath)));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, clientBuildPath, "/index.html"));
});
// listen
server.listen(port, () => { });
//# sourceMappingURL=index.js.map